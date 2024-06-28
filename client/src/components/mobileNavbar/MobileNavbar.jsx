import React from "react";
import "./mobileNavbar.css";
import { mobileNavbarMenu } from "../../data";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
const MobileNavbar = ({setIsNavbarOpen,isNavbarOpen}) => {
  return (
    <div className={`mobile_navbar ${isNavbarOpen ? "open" : ""}`}>
        <div className="mobile_navbar_header">
        <Link to="/" classNameName="logo">
            <span>ᴺᵉʷ</span> 𝓘𝓻𝓪𝓷𝓲 𝓑𝓸𝓻𝓴𝓪 𝓗𝓸𝓾𝓼𝓮
          </Link>
          <IoClose onClick={() => setIsNavbarOpen(false)} />
        </div>
      <div className="mobile_navbar_menu">
        <ul>
            {
                mobileNavbarMenu.map((menu,index) => {
                    return (
                        <li key={index}>
                            <a href={menu.path}>{menu.name}</a>
                        </li>
                    )
                })
            }
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
