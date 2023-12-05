import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "./InputField.css";

const InputField = (props) => {
  const { required, type, placeholder, onChange, icon } = props;

  return (
    <TextField
      variant="outlined"
      required={required}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className="input-field"
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" className="input-field-icon">
            {icon}
          </InputAdornment>
        ),
      }}
      inputProps={{
        sx: {
          color: "#F8F8EB",
          letterSpacing: "0.5px",

          "&::placeholder": {
            color: "#F8F8EB",
            opacity: 1,
            fontSize: "15px",
            letterSpacing: "1.5px",
          },
          "&:focus::placeholder": {
            color: "#F8F8EB",
            opacity: 0.3,
          },
        },
      }}
      sx={{
        "& fieldset": { border: "none" },
      }}
    />
  );
};

export default InputField;
