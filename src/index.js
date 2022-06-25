import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextManager } from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextManager>
    <App />
  </AuthContextManager>
);
