import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const SauceInput = ({ sauce, setSauce, sauceError, sauceOptions }) => {
  return (
    <FormControl fullWidth sx={{ mt: 2, width: "100%" }} error={sauceError}>
      <InputLabel required>Sauce</InputLabel>
      <Select
        value={sauce}
        label="Sauce"
        onChange={(e) => setSauce(e.target.value)}
      >
        {sauceOptions.map((sauceType, index) => (
          <MenuItem key={index} value={sauceType}>
            {sauceType}
          </MenuItem>
        ))}
      </Select>
      {sauceError && (
        <FormHelperText error>Please select a sauce</FormHelperText>
      )}
    </FormControl>
  );
};

export default SauceInput;
