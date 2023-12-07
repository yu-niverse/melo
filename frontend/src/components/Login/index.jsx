import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../commonComponents/InputField";
import OutlinedButton from "../commonComponents/OutlineButton";
import HorizontalOr from "../commonComponents/HorizontalOr";
import { ReactComponent as EmailIcon } from "../../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../../assets/password.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.log(email, password);
    navigateToPlay();
  };

  const handleGoogle = () => {
    console.log("Continue with Google");
  };

  const navigateToPlay = () => {
    navigate("/play");
  };

  return (
    <div id="login-page">
      <div id="login-container">
        <div className="title">
          <span className="title-text">Login</span>
        </div>
        <InputField
          required={true}
          type="email"
          placeholder="Email"
          onChange={setEmail}
          icon={<EmailIcon />}
        />
        <InputField
          required={true}
          type="password"
          placeholder="Password"
          onChange={setPassword}
          icon={<PasswordIcon />}
        />
        <OutlinedButton
          text={<span className="login-button-text">Continue</span>}
          handleClick={handleLogin}
        />
        <HorizontalOr />
        <OutlinedButton
          text={
            <span className="google-button-text">Continue with Google</span>
          }
          icon={<GoogleIcon className="google-icon" />}
          handleClick={handleGoogle}
        />
      </div>
    </div>
  );
};

export default Login;
