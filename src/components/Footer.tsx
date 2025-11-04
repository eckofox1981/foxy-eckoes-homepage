import { Link } from "react-router-dom";
import foxyEckoesFox from "../assets/logos/F-E-logo.png";
import "../styles/header-footer.css";

export function Footer() {
  return (
    <footer>
      <Link to="/">
        <img src={foxyEckoesFox} alt="Foxy Eckoes Fox logo" />
      </Link>
      <a href="/">Home</a>
      <a href="/#">Privacy policy</a>
      <a href="/#">About</a>
    </footer>
  );
}
