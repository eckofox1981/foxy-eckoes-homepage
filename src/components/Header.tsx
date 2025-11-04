import classNames from "classnames";
import foxyEckoesLogo from "../assets/logos/F-E-logo-title.png";
import { Hamburger } from "../assets/svg/hamburgerMenu";
import "../styles/header-footer.css";
import "../styles/buttons.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [show, setShow] = useState("");
  const [loginButton, setLoginButton] = useState<string>("Login");

  const showMenu = () => {
    if (show === "") {
      setShow("show");
    } else {
      setShow("");
    }
  };

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
        <li>
          <a href="/login">
            <button className="menu-button">{loginButton}</button>
          </a>
        </li>

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
