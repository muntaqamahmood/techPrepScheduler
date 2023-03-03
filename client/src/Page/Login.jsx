import React from 'react'
import "../Styles/Login.css"

const Login = () => {
  return (
    <div class ="login">
            <head>
                <div class = "logo"></div>
            </head>
    
            <body>
                  
                     <form class = "complex-form" id = "login-form">
                                <div class="form-title">Register / Login</div>

                                <div class ="form-text"> Email: </div>
                                <input
                                  type="text"
                                  name="username"
                                  class="form-element"
                                  placeholder="Enter a username"
                                />

                                <div class = "form-text"> Password: </div>
                                <input
                                  type="password"
                                  name="password"
                                  class="form-element"
                                  placeholder="Enter a password"
                                />
                                
                                <span>
                                    <button id="signin" name="action" class="btn">Sign in</button>
                                    <button id="signup" name="action" class="btn">Sign up</button>
                                </span>

                                <button id="reset" name="action" class="btn">Login with Google</button>
                     </form>
            </body>
    </div>
  )
}

export default Login
