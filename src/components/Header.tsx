import classNames from "classnames";
import foxyEckoesLogo from "../assets/logos/F-E-logo-title.png";
import { Hamburger } from "../assets/svg/hamburgerMenu";
import "../styles/header-footer.css";
import "../styles/buttons.css";
import { useState } from "react";

export function Header() {
  const [show, setShow] = useState("");

  const showMenu = () => {
    if (show === "") {
      setShow("show");
    } else {
      setShow("");
    }
  };

  return (
    <header>
      <img src={foxyEckoesLogo} alt="Foxy Eckoes logo" />
      <p>Book your next entertainment event!</p>
      <div onClick={showMenu}>
        <Hamburger />
      </div>
      <ul className={classNames("menu-bar", { show })}>
        <li>
          <button className="menu-button">Login</button>
        </li>
        <li>
          <button className="menu-button">Event</button>
        </li>
        <li>
          <button className="menu-button">About</button>
        </li>
      </ul>
    </header>
  );
}
