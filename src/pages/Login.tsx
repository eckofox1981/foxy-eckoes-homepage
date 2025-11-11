import "../styles/login.css";
import "../styles/buttons.css";
import foxyEckoesLogo from "../assets/logos/F-E-logo-title.png";
import { useState } from "react";
import { User } from "../models/User";
import classNames from "classnames";
import { login, registerUser } from "../api/UserRequests";
import { setToken } from "../localstorage/Token";
import { useNavigate } from "react-router-dom";
import { useLoginBtnStore } from "../store/LoginBtnStore";
import { useToastStore } from "../store/ToastStore";

export function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameRegister, setUsernameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string[]>([]);
  const navigate = useNavigate();
  const setLoginBtnToAccount = useLoginBtnStore((store) => store.setToAccount);
  const showToast = useToastStore((store) => store.showToast);

  const handleLogin = async () => {
    try {
      const jwtToken = await login(username, password);
      setToken(jwtToken);
      setLoginBtnToAccount();
      navigate("/account");
    } catch (e: any) {
      showToast("Could not log in", e.message, "var(--special-color)");
    }
  };

  const handleRegister = async () => {
    const user: User = new User(
      "",
      usernameRegister,
      firstName,
      lastName,
      email,
      [],
      "user",
      ""
    );
    const ifMessage: string[] = checkRegisterData(
      user,
      passwordRegister,
      confirm
    );
    setMessage(ifMessage);
    if (ifMessage.length === 0) {
      try {
        const successMsg = await registerUser(user, password, confirm);
        alert(successMsg);
        setLoginBtnToAccount();
        navigate("/account");
      } catch (error: any) {
        showToast(
          "Error creating user:",
          error.message,
          "var(--special-color)"
        );
      }
    }
  };

  const Message = () => {
    if (message.length > 0) {
      return (
        <div className="error-messages">
          {message.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <main className="login-main">
      <img src={foxyEckoesLogo} alt="Foxy Eckoes logo" />
      <section className={classNames("login-section", "withBorderBottom")}>
        <h2>Login to book one of our amazing events!</h2>
        <form action="login" className="login-form">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              onChange={(event) => setUsername(event?.target?.value || "")}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target?.value || "")}
            />
          </div>
        </form>
        <button className="menu-button" onClick={handleLogin}>
          Login
        </button>
      </section>
      <section className="login-section">
        <h3>
          You don't have account? Enroll and book yourselves to some amazing
          entertainement!
        </h3>
        <form action="register">
          <div className="form-field">
            <label htmlFor="usernameRegister">Username</label>
            <input
              id="usernameRegister"
              type="text"
              placeholder="username"
              onChange={(event) =>
                setUsernameRegister(event.target?.value || "")
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="passwordRegister">Password</label>
            <input
              id="passwordRegister"
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPasswordRegister(event.target?.value || "");
              }}
            />
          </div>{" "}
          <div className="form-field">
            <label htmlFor="password-confirmRegister">Confirm</label>
            <input
              id="password-confirmRegister"
              type="password"
              placeholder="confirm password"
              onChange={(event) => {
                setConfirm(event.target?.value || "");
              }}
            />
          </div>{" "}
          <div className="form-field">
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              type="text"
              placeholder="John"
              onChange={(event) => {
                setFirstName(event.target?.value || "");
              }}
            />
          </div>{" "}
          <div className="form-field">
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              placeholder="Doe"
              onChange={(event) => {
                setLastName(event.target?.value || "");
              }}
            />
          </div>{" "}
          <div className="form-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              placeholder="john.doe@example.com"
              onChange={(event) => setEmail(event.target?.value || "")}
            />
          </div>
        </form>
        <button className="menu-button" onClick={handleRegister}>
          Register
        </button>
      </section>
      <section className="login-message">
        <Message />
      </section>
    </main>
  );
}

function checkRegisterData(user: User, password: string, confirm: string) {
  let errors: string[] = [];

  if (!user.username) {
    errors.push("Please enter a username.");
  }
  if (!password) {
    errors.push("Please enter a password.");
  } else {
    if (password.length <= 5) {
      errors.push(
        "Password must be at least 6 characters long, please try again."
      );
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push(
        "Password must contain at least one lowercase letter, please try again."
      );
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push(
        "Password must contain at least one uppercase letter, please try again."
      );
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push(
        "Password must contain at least one number, please try again."
      );
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      errors.push(
        "Password can only contain letters and numbers, please try again."
      );
    }
  }
  if (!password) {
    errors.push("Please enter a password.");
  }
  if (password !== confirm) {
    errors.push("Your passwords do not match, please try again.");
  }
  if (!user.firstName) {
    errors.push("Please enter a first name.");
  }
  if (!user.lastName) {
    errors.push("Please enter a last name.");
  }
  if (!user.email) {
    errors.push("Please enter an email.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push("Please enter a valid email address.");
  }

  return errors;
}
