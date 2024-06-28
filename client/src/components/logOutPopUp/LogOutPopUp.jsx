import React from "react";
import "./logOutPopUp.css";
import { logOut } from "../../service/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";

const LogOutPopUp = ({logOutPopUp}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogOut = (userData) => {
    logOut()
      .then((res) => {
        // console.log("🚀 ~ .then ~ res:", res);
        toast.success("user logged out successfully")
        dispatch(userNotExists())
        logOutPopUp(false)
        return navigate("/login");
      })
      .catch((error) =>
        toast.error(error?.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <div className="logOut_popUp_container">
      <div class="logOut_popUp">
        <h1>LogOut</h1>
        <p className="Description">If you logOut can not access cart, profile and you can not add any product to cart </p>
        <div class="buttonContainer">
          <button class="acceptButton" onClick={handleLogOut}>LogOut</button>
          <button class="declineButton" onClick={() => logOutPopUp(false)}>Not Now</button>
        </div>
      </div>
    </div>
  );
};

export default LogOutPopUp;
