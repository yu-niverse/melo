import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div id="signup">
      <h1 class="title">Create Account</h1>
      <Stack direction="column" spacing={2} component="form">
        <TextField
          required
          id="username"
          classname="fields"
          label="Username"
          variant="outlined"
          size="small"
          InputProps={{
            style: { 
              borderRadius: "5px",
              color: "#F8F8EB", 
            },
          }}
          InputLabelProps={{
            style: { 
              color: "#F8F8EB",
              opacity: "0.2",
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#F8F8EB',
              },
              '& .Mui-focused fieldset': {
                borderColor: '#F8F8EB',
              },
            },
          }}
        />
        <TextField
          required
          id="email"
          classname="fields"
          label="Email"
          variant="outlined"
          size="small"
        />
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          classname="fields"
          variant="filled"
          size="small"
        >
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Stack>
    </div>
  );
};
export default Signup;
