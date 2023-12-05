import "./Welcome.css";
import { Link } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";

const Welcome = () => {
  return (
    <div id="welcome">
      <h1 id="title">Welcome to</h1>
      <h1 id="melo">MELO</h1>
      <Button
        class="login"
        variant="contained"
        sx={{ ml: 6, textTransform: "capitalize" }}
      >
        <Link to="/login">Login</Link>
      </Button>
      <span class="signup">
        Don't have an account? <a href="/signup"> Sign up</a>
      </span>
    </div>
  );
};

export default Welcome;
