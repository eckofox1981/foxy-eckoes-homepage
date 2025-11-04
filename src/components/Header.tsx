import classNames from "classnames";
import foxyEckoesLogo from "../assets/logos/F-E-logo-title.png";
import { Hamburger } from "../assets/svg/hamburgerMenu";
import "../styles/header-footer.css";
import "../styles/buttons.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../localstorage/Token";
import { useLoginBtnStore } from "../store/LoginBtnStore";

export function Header() {
  const [show, setShow] = useState("");
  const loginBtn = useLoginBtnStore((store) => store.loginBtn);

  const showMenu = () => {
    if (show === "") {
      setShow("show");
    } else {
      setShow("");
    }
  };

  const loginButton = () => {
    return (
      <a href={loginBtn.link}>
        <button className="menu-button">{loginBtn.text}</button>
      </a>
    );
  };

  useEffect(() => {
    loginButton();
  }, [loginBtn]);

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
          <button className="menu-button">Event</button>
        </li>
        <li>
          <a href="/#">
            <button className="menu-button">About</button>
          </a>
        </li>
      </ul>
    </header>
  );
}
