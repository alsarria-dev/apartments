import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <p className="logo-title">HomeBrew</p>
      </Link>
      <ul className="navbarUl">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/properties">Properties</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/add_apartment">Add apartment</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
