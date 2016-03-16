import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button.jsx";

// export Sprinkles, React and ReactDOM globally
window.Sprinkles = {
  Button: Button,
  React: React,
  ReactDOM: ReactDOM
};
window.React = React;
window.ReactDOM = ReactDOM;
