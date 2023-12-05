import "./Welcome.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div id="welcome">
      <h1 id="title">Hi, Welcome to</h1>
      <h1 id="melo">MELO</h1>
      <Button
        class="login"
        variant="contained"
        sx={{ ml: 6, textTransform: "capitalize" }}
        onClick={navigateToLogin}
      >
        Login
      </Button>
      <span class="signup">
        First time here? <span onClick={navigateToSignup}> Sign up</span>
      </span>
    </div>
  );
};

export default Welcome;
