import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>Control panel</title>
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
