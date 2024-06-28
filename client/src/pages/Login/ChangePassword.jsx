import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../service/user.service";
import './register.css'
import { toast } from "react-toastify";
const ChangePassword = (props) => {
  const dispatch = useDispatch();

  const handleChenge = (e) => {
    console.log(e.target);
  };

  const navigate = useNavigate();
  //How to use react-form-hock in login?
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log("🚀 ~ Login ~ rs:", errors);
  const onSubmit = (userData) => {
    if (userData.newPassword !== userData.confirmPassword) {
      // Display error message or handle mismatch
      toast.error("Password do not match")
      return;
    }
    // toast.success(userData,{position:"top-center"})
    changePassword(userData)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        return navigate("/profile");
      })
      .catch((error) =>
        toast.error(error?.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <section className="user_authorization_section">
      <div className="user_authorization">
        <div className="user_authorization_container">
          <form className="user_authorization_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="head">
              <span>Forgot Password</span>
            </div>
            <div className="inputs">
            <input
                type="password"
                placeholder="Enter old password"
                className={`${errors?.oldPassword ? "error" : ""}`}
                {...register("oldPassword", {
                  required: true,
                })}
              />
              {errors?.oldPassword && (
                <p className="error_text">old password is required.</p>
              )}
              <input
                type="password"
                placeholder="Enter new password"
                className={`${errors?.oldPassword ? "error" : ""}`}
                {...register("newPassword", {
                  required: true,
                })}
              />
              {errors?.newPassword && (
                <p className="error_text">new Password is required.</p>
              )}
              <input
                type="password"
                placeholder="Enter confirm password"
                className={`${errors?.oldPassword ? "error" : ""}`}
                {...register("confirmPassword", {
                  required: true,
                })}
              />
              {errors?.confirmPassword && (
                <p className="error_text">confirm password is required.</p>
              )}
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
