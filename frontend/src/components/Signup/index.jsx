import React from "react";
import InputField from "../commonComponents/InputField";
import OutlinedButton from "../commonComponents/OutlineButton";
import HorizontalOr from "../commonComponents/HorizontalOr";
import { useUserSignup } from "../../hooks/useUser";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as EmailIcon } from "../../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../../assets/password.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";
import "./Signup.css";

const Signup = () => {
  const mutation = useUserSignup();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleContinue = () => {
    console.log(username, email, password);
    mutation.mutate({ username, email, password });
  };

  const handleGoogle = () => {
    console.log("Continue with Google");
  };

  return (
    <div id="signup">
      <div id="signup-container">
        <div className="title">
          <span className="title-text">Create Account</span>
        </div>
        <InputField
          required={true}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          icon={<UserIcon />}
        />
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
          handleClick={handleContinue}
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

export default Signup;
