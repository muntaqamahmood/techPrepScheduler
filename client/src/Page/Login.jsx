import React from "react";
import "../Styles/Login.css";
import "../Styles/form.css";
import "../Styles/col.css";

const Login = () => {
  return (
    <div className="row">
      <div className="col-auto"></div>

      <div className="col-auto">
        <div className="login">
          <div className="logo"></div>
          {/* <div className="logo">
          <img src="../../public/techprep-scheduler-logo.png" alt="App Logo" />
        </div> */}

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

            {/* <span>
            <button id="signin" name="action" className="btn">
              Sign in
            </button>
            <button id="signup" name="action" className="btn">
              Sign up
            </button>
          </span> */}

            <button id="reset" name="action" className="btn">
              Login with Google
            </button>
          </form>
        </div>
      </div>
      <div className="col-auto"></div>
    </div>
  );
};

export default Login;
