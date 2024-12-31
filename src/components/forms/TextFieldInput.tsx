import React from "react";
import { TextField } from "@mui/material";
import { green } from "@mui/material/colors";

interface TextFieldInputProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  id,
  label,
  value,
  onChange,
  multiline = false,
  rows = 1,
  required = false,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      required={required}
      multiline={multiline}
      rows={rows}
      sx={{
        input: { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: green[500],
          },
          "&:hover fieldset": {
            borderColor: green[600],
          },
          "&.Mui-focused fieldset": {
            borderColor: green[700],
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: green[700],
        },
        "& .MuiInputBase-root": {
          color: "white",
        },
        "& .MuiTextareaAutosize-root": {
          color: "white",
        },
      }}
    />
  );
};

export default TextFieldInput;
