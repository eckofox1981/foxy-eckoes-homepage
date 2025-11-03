import foxyEckoesFox from "../assets/logos/F-E-logo.png";
import "../styles/header-footer.css";

export function Footer() {
  return (
    <footer>
      <img src={foxyEckoesFox} alt="Foxy Eckoes Fox logo" />
      <a href="/">Home</a>
      <a href="/#">Privacy policy</a>
      <a href="/#">About</a>
    </footer>
  );
}
