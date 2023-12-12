import React from "react";
import { useUserLogin } from "../../hooks/useUser";
import InputField from "../commonComponents/InputField";
import OutlinedButton from "../commonComponents/OutlineButton";
import HorizontalOr from "../commonComponents/HorizontalOr";
import { ReactComponent as EmailIcon } from "../../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../../assets/password.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";
import "./Login.css";

const Login = () => {

  const mutation = useUserLogin();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.log(email, password);
    mutation.mutate({ email, password });
  };

  const handleGoogle = () => {
    console.log("Continue with Google");
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
          onChange={(e) => setEmail(e.target.value)}
          icon={<EmailIcon />}
        />
        <InputField
          required={true}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
