import {default as logo} from "../assets/sbdi-logo-orginal-large.png";
import "../index.css";

const links = ["Data", "More details", "About"];

export default function Header() {
  return (
    <nav className="header">
      <div>
        <a href="./Header">
          <img src={logo.src} alt="Swedish Biodiversity Data Infrastructure" className="logo"/>
        </a>
      </div>
      <h1 className="logo-name">Swedish Biodiversity Data Infrastructure</h1>
      <input type="search" name="search-bar" id="" className="search-bar" />
      <ul className="pages">
        {links.map((link) => <li key={link}><a href="#">{link}</a></li>)}
      </ul>
    </nav>
  );
}