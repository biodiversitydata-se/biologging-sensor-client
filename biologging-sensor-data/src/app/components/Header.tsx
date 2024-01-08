import {default as logo} from "../assets/sbdi-logo-orginal-large.png";

const links = ["Data", "More details", "About"];

export default function Header() {
  return (
    <nav className="header flex justify-between items-center h-20 p-4">
      <div>
        <a href="./Header">
          <img src={logo.src} alt="Swedish Biodiversity Data Infrastructure" className="h-10"/>
        </a>
      </div>
      <h1 className="ml-4 font-semibold mr-auto">Swedish Biodiversity Data Infrastructure</h1>
      <input type="search" name="search-bar" id="" />
      <ul className="flex gap-6 list-none font-semibold">
        {links.map((link) => <li key={link}><a href="#">{link}</a></li>)}
      </ul>
    </nav>
  );
}