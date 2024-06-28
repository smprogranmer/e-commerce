import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
// import { useForm } from "react-hook-form";
import "./login.css";
import { login } from "../../service/user.service";
import { toast } from "react-toastify";
import { userExists } from "../../redux/reducers/auth";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // checking the user already login or not
  useEffect(()=>{
    if(user){
      navigate("/profile")
    }
  },[user,navigate])
  //How to use react-form-hock in login?
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log("🚀 ~ Login ~ rs:", errors);
  const onSubmit = async (userData) => {
    // toast.success(userData,{position:"top-center"})
    try {
      const res = await login(userData);
      console.log("🚀 ~ .then ~ res:", res);
      localStorage.setItem("token", res.data.token);
      dispatch(userExists(true))
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <section className="user_authorization_section">
        <div className="user_authorization">
          <div className="user_authorization_container">
            <form className="user_authorization_form" onSubmit={handleSubmit(onSubmit)}>
              <div className="head">
                <span>Login</span>
                {/* <p>Create a free account with your email.</p> */}
              </div>
              <div className="inputs">
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

              <div className="remember_forget_div">
              <label
                className="text-sm text-black cursor-pointer"
                for="remember-me"
              >
                <input className="mr-2" id="remember-me" type="checkbox" />
                Remember me
              </label>
              <NavLink
                to="/singup"
                className="text-sm text-blue-500 hover:underline mb-0.5"
                href="#"
              >
                Forgot password?
              </NavLink>
            </div>
              <button type="submit">Login</button>
            </form>
            <div className="user_authorization_footer">
              <p>
                Create an account? <Link to="/singup">singup</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
