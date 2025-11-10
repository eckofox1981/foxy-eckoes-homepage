import classNames from "classnames";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { updateUser } from "../../api/UserRequests";
import { useToastStore } from "../../store/ToastStore";

export function UserEditor({
  show,
  close,
  user,
  refresh,
}: {
  show: string;
  close: () => void;
  user: User | null;
  refresh: () => void;
}) {
  const [display, setDisplay] = useState<string>("show");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const showToast = useToastStore((store) => store.showToast);

  useEffect(() => {
    setDisplay(show);
    if (user) {
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [show]);

  const handleCancel = () => {
    close();
  };

  const handleSave = async () => {
    try {
      const updatedUser = new User(
        user?.userID || "",
        username,
        firstName,
        lastName,
        email,
        user?.bookings || [],
        user?.role || "",
        user?.openIdProvider || ""
      );
      const confirmed = await updateUser(updatedUser);
      showToast(
        "User data updated!",
        "Username: " +
          confirmed.username +
          "\nFirst name: " +
          confirmed.firstName +
          "\nLast name: " +
          confirmed.lastName +
          "\nE-mail: " +
          confirmed.email,
        "green"
      );
      refresh();
      close();
    } catch (error: any) {
      showToast(
        "Error updating userdata:",
        error.message + "\nPlease try again.",
        "red"
      );
    }
  };

  return (
    <section className={classNames("modal", display)}>
      <h3>Update the fields as you need then press 'Save'.</h3>
      <form action="register" className="login-form">
        <div className="form-field">
          <label htmlFor="usernameRegister">Username</label>
          <input
            id="usernameRegister"
            type="text"
            value={username}
            placeholder="username"
            onChange={(event) => setUsername(event.target?.value || "")}
          />
        </div>
        <div className="form-field">
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            type="text"
            placeholder="John"
            value={firstName}
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
            value={lastName}
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
            value={email}
            placeholder="john.doe@example.com"
            onChange={(event) => setEmail(event.target?.value || "")}
          />
        </div>
      </form>
      <button className="menu-button" onClick={handleSave}>
        Save edit
      </button>
      <button className="cancel-button" onClick={handleCancel}>
        Cancel
      </button>
    </section>
  );
}
