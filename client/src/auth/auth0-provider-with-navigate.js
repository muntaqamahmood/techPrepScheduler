// import { Auth0Provider } from "@auth0/auth0-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export const Auth0ProviderWithNavigate = ({ children }) => {
//   const navigate = useNavigate();

//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//   const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

//   const onRedirectCallback = (appState) => {
//     navigate(appState?.returnTo || window.location.pathname);
//   };

//   if (!(domain && clientId && redirectUri)) {
//     return null;
//   }

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: redirectUri,
//       }}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-erj265oq238eqng7.us.auth0.com"
    clientId="mBt7vfI5HJV3XYqkLJESZiNUeMl3ccuf"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);