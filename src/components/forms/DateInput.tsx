import React from "react";
import { TextField } from "@mui/material";
import { green } from "@mui/material/colors";

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const DateInput: React.FC<DateInputProps> = ({ id, label, value, onChange }) => {
  return (
    <TextField
      id={id}
      label={label}
      type="datetime-local"
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      required
      sx={{
        input: { color: green[500] },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: green[500],
          },
          "&:hover fieldset": {
            borderColor: green[500],
          },
          "&.Mui-focused fieldset": {
            borderColor: green[500],
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: green[700],
        },
        "& .MuiSvgIcon-root": {
          color: green[500],
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateInput;
