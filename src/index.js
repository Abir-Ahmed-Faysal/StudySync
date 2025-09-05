import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("SW registered:", reg))
      .catch(err => console.log("SW registration failed:", err));
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
