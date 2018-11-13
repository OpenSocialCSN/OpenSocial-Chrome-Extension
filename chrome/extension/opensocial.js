import React from "react";
import ReactDOM from "react-dom";
import Root from "../../app/containers/Root";
import "./opensocial.css";

let store;

chrome.storage.local.get("state", obj => {
  const { state } = obj;
  const initialState = JSON.parse(state || "{}");
  const createStore = require("../../app/store/configureStore");
  store = createStore(initialState);

  ReactDOM.render(<Root store={store} />, document.querySelector("#root"));
});

export { store };
