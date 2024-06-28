import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";
import { Links } from "../data";
import logo from "../images/logo.jpg";
import "./navber.css";

const Navbar = () => {
  const [isNavbar, setIsnavbar] = useState(false);
  return (
    <nav>
      <div className="Container nav__Container">
        
        <Link to="logo" className="logo">
          <img src={logo} alt="Nav Logo" />
        </Link>
        <ul  className={`nav__links ${isNavbar ? "show__menu" : "hide__menu"}`}>
        {Links.map(({ name, path }, index) => {
              return (
                <li key={index}>
                  <NavLink  to={path}>{name}</NavLink>
                </li>
              );
            })}
        </ul>
        <button
          className="nav__toggle-btn"
          onClick={(nav) => setIsnavbar(!isNavbar)}
        >
          {isNavbar ? <MdOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};


{/* <article key={index}>
            <p>{products.name}</p>
            <p>{products.price}</p>
          </article> */}


export default Navbar;
