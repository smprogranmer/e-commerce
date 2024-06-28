import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Links, NIBH_LINKS } from "../../data";
import './nibhSideber.css'
const NIBHSIDEBER = () => {
    return (
        <div className='NIBH_SIDEBER'>
            <div className="NIBH_LOGO">
                <Link to="/" classNameName="logo">
                    <span>ᴺᵉʷ</span> 𝓘𝓻𝓪𝓷𝓲 𝓑𝓸𝓻𝓴𝓪 𝓗𝓸𝓾𝓼𝓮
                </Link>

            </div>
            <ul className="NAV_ITEMS">
                {
                    NIBH_LINKS.map(({ name, path }, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={path} className={({ isActive }) => isActive ? "active__nav" : ""}>{name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>

            {/* <div className="social__icons">
                <div className="search__ber">
                    <input type="search" name="" id="" placeholder="Search" />
                    <AiOutlineSearch />
                </div>
                <NavLink to='/cart'><AiFillShopping /></NavLink>
                <NavLink to='/login'><MdAccountCircle /></NavLink>
                <i className="fa-brands fa-twitter"></i>
            </div> */}

        </div>
    )
}

export default NIBHSIDEBER