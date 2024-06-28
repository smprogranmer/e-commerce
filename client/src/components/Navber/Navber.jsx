import React, { useState } from "react";
import "./navber.css";

import { AiOutlineSearch, AiFillShopping } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { Links } from "../../data";
import SearchBar from "../searchBar/SearchBar";
import MobileNavbar from "../mobileNavbar/MobileNavbar";
import ProfileNavbar from "../profileNavber/ProfileNavbar";


const Navber = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);



  return (
    <>
        <nav>
      <div className="container nav__container">
        <FaBars className="bars" onClick={() => setIsNavbarOpen(!isNavbarOpen)}/>
        <MobileNavbar setIsNavbarOpen={setIsNavbarOpen} isNavbarOpen={isNavbarOpen}/>
        <div className="logo">
          <Link to="/" classNameName="logo">
            <span>ᴺᵉʷ</span> 𝓘𝓻𝓪𝓷𝓲 𝓑𝓸𝓻𝓴𝓪 𝓗𝓸𝓾𝓼𝓮
          </Link>

        </div>
        <ul className="nav__items">
          {
            Links.map(({ name, path }, index) => {
              return (
                <li key={index}>
                  <NavLink to={path} className={({ isActive }) => isActive ? "active__nav" : ""}>{name}</NavLink>
                </li>
              )
            })
          }
        </ul>

        <div className="social__icons">
          <SearchBar/>
          <NavLink to='/cart'><AiFillShopping /></NavLink>
          <ProfileNavbar/>
        </div>

      </div>
    </nav>
    {/* {isNavbarOpen && } */}
    </>
    
  );
};

export default Navber;
