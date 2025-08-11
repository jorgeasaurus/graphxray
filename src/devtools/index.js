import React from "react";
import ReactDOM from "react-dom";
import DevTools from "./DevTools.js";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

// Initialize Fluent UI icons once for this entry point
initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <DevTools />
  </React.StrictMode>,
  document.getElementById("devtools")
);
