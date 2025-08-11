import React from "react";
import ReactDOM from "react-dom";
import Options from "./Options";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

// Initialize Fluent UI icons once for this entry point
initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("options")
);
