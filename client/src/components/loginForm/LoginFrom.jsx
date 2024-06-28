import React from "react";

const LoginFrom = ({ name, totalInput }) => {
  return (
    <div className="register_from">
      <div className="from_container">
        <form>
          <div className="head">
            <span>{name}</span>
            {/* <p>Create a free account with your email.</p> */}
          </div>
          <div className="inputs">
            {totalInput.map((inputDetails) => {
                return <input type={inputDetails.type} placeholder={inputDetails.placeholder} />;
  
            })}
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className="form-footer">
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
