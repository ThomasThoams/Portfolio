import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./Reducer/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));

//création du store
const store = createStore(reducer);

store.subscribe(() => {
  //à chaque changement du state, on enregistre sa nouvelle version dans le storage
  sessionStorage.setItem("session", JSON.stringify(store.getState()));
});

console.log("State init : ", store.getState());

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
