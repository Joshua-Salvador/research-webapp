import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux";
import { ThemeProvider } from "@material-ui/core";
import theme from "./MuiTheme";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDcfO7vs9q4xCkXjaFXv1byKWKVB8YlBbE",
  authDomain: "usc-shs-research02.firebaseapp.com",
  projectId: "usc-shs-research02",
  storageBucket: "usc-shs-research02.appspot.com",
  messagingSenderId: "1068215553841",
  appId: "1:1068215553841:web:d12813330a326c00572a10",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
