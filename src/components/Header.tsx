import classNames from "classnames";
import foxyEckoesLogo from "../assets/logos/F-E-logo-title.png";
import { Hamburger } from "../assets/svg/hamburgerMenu";
import "../styles/header-footer.css";
import "../styles/buttons.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginBtnStore } from "../store/LoginBtnStore";
import { getToken } from "../localstorage/Token";

export function Header() {
  const [show, setShow] = useState("");
  const loginBtn = useLoginBtnStore((store) => store.loginBtn);
  const setLoginBtnToAccount = useLoginBtnStore((store) => store.setToAccount);
  const setLoginBtnToLogin = useLoginBtnStore((store) => store.setToLogin);

  const showMenu = () => {
    if (show === "") {
      setShow("show");
    } else {
      setShow("");
    }
  };

  const loginButton = () => {
    return (
      <Link to={loginBtn.link}>
        <button className="menu-button">{loginBtn.text}</button>
      </Link>
    );
  };

  useEffect(() => {
    loginButton();
  }, [loginBtn]);

  useEffect(() => {
    if (getToken() === undefined) {
      setLoginBtnToLogin();
    } else {
      setLoginBtnToAccount();
    }
  }, []);

  return (
    <header>
      <Link to="/">
        <img src={foxyEckoesLogo} alt="Foxy Eckoes logo" />
      </Link>
      <p>Book your next entertainment event!</p>
      <div onClick={showMenu}>
        <Hamburger />
      </div>
      <ul className={classNames("menu-bar", { show })}>
        <li>{loginButton()}</li>

        <li>
          <Link to={"/"}>
            <button className="menu-button">Event</button>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <button className="menu-button">About</button>
          </Link>
        </li>
      </ul>
    </header>
  );
}
