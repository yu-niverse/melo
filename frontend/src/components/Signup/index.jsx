import React from "react";
import InputField from "../commonComponents/InputField";
import OutlinedButton from "../commonComponents/OutlineButton";
import HorizontalOr from "../commonComponents/HorizontalOr";
import { ReactComponent as UploadIcon } from "../../asserts/upload.svg";
import { ReactComponent as UserIcon } from "../../asserts/user.svg";
import { ReactComponent as EmailIcon } from "../../asserts/email.svg";
import { ReactComponent as PasswordIcon } from "../../asserts/password.svg";
import { ReactComponent as GoogleIcon } from "../../asserts/google.svg";
import IconButton from "@mui/material/IconButton";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFile = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };

  const handleContinue = () => {
    console.log(username, email, password);
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
        <div className="upload">
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <IconButton className="upload-icon" onClick={handleClick}>
            <UploadIcon />
          </IconButton>
          <span className="upload-text">Upload your profile pic</span>
        </div>
        <InputField
          required={true}
          type="text"
          placeholder="Username"
          onChange={setUsername}
          icon={<UserIcon />}
        />
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
