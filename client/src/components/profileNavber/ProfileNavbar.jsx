import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import "./profileNavbar.css";
import { useSelector } from "react-redux";
import LogOutPopUp from "../logOutPopUp/LogOutPopUp";
const ProfileNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logOutPopUp, setLogOutPopUp] = useState(false);

  const handleLogout = () => {
    setLogOutPopUp(!logOutPopUp);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (event, logOut) => {
    if (user) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <MdAccountCircle onClick={handleClick} />
      {isMenuOpen && (
        <div className="profile_navbar">
          <NavLink to="/profile" onClick={handleClick}>
            Profile
          </NavLink>
          <NavLink to="/cart" onClick={handleClick}>
            Cart
          </NavLink>
          <NavLink to="/change-password" onClick={handleClick}>
            Change Password
          </NavLink>
          <NavLink onClick={handleLogout}>LogOut</NavLink>
        </div>
      )}
      {logOutPopUp && <LogOutPopUp logOutPopUp={setLogOutPopUp} />}
    </>
  );
};

export default ProfileNavbar;
