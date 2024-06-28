import React, { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { BiLogoFacebookCircle } from "react-icons/bi";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
  AiOutlineMail,
  AiFillInstagram,
} from "react-icons/ai";
import "./register.css";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/Register/Register.action";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { singUp } from "../../service/user.service";

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log("🚀 ~ Login ~ rs:", errors);
  const onSubmit =  (userData) => {
    singUp(userData)
    .then((res) =>{
      // localStorage.setItem("token", res.data.token);
      toast.success("User registered successfully")
      // dispatch(userExists(true));\
      return navigate('/login')
    })
    .catch((err) => {
      console.error("Failed to register: ", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    })
  };

  return (
    <section className="user_authorization_section">
      <div className="user_authorization">
        <div className="user_authorization_container">
          <form  className="user_authorization_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="head">
              <span>Sign up</span>
              <p>Create a free account with your email.</p>
            </div>
            <div className="inputs">
              <input
                type="text"
                placeholder="Full Name"
                className={`${errors?.fullName ? "error" : ""}`}
                {...register("fullName", {
                  required: true,
                })}
              />
              {errors?.fullName && (
                <p className="error_text">full Name is required</p>
              )}
              <input
                type="email"
                placeholder="Email"
                className={`${errors?.email ? "error" : ""}`}
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                      "Eamil address  must be a valid  address",
                  },
                })}
              />
              {errors?.email && (
                <p className="error_text">Emial is required</p>
              )}
              <input
                type="password"
                placeholder="Password"
                className={`${errors?.password ? "error" : ""}`}
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password && (
                <p className="error_text">Password is required.</p>
              )}
            </div>
            <button type="submit">Sign up</button>
          </form>
          <div className="user_authorization_footer">
            <p>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
