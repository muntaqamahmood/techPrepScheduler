import React from "react";
import "../Styles/Login.css";
import "../Styles/form.css";
import "../Styles/col.css";
import logo from "../media/tpslogo.png";

const Login = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="App Logo" />
      </div>
      <div className="row">
        <div className="col-auto"></div>
      </div>

      <div className="row">
        <div className="col-auto"></div>

        <div className="col-auto">
          <div className="login">
            <form className="complex-form" id="login-form">
              <div className="form-title">Register / Login</div>

              <div className="form-text"> Email: </div>
              <input
                type="text"
                name="username"
                className="form-element"
                placeholder="Enter a username"
              />

              <div className="form-text"> Password: </div>
              <input
                type="password"
                name="password"
                className="form-element"
                placeholder="Enter a password"
              />
              <button id="reset" name="action" className="btn">
                Login with Google
              </button>
            </form>
          </div>
        </div>
        <div className="col-auto"></div>
      </div>
    </div>
  );
};

export default Login;
