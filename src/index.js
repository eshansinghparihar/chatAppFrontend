import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
const googleClientid = process.env.REACT_APP_GOOGLE_CLIENTID;
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleClientid}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
