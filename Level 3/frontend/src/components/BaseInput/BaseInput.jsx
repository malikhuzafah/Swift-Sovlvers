import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const BaseInput = ({
  pizzaBase,
  setPizzaBase,
  pizzaBaseError,
  pizzaBaseOptions,
}) => {
  return (
    <FormControl fullWidth sx={{ mt: 2, width: "100%" }} error={pizzaBaseError}>
      <InputLabel required>Pizza Base</InputLabel>
      <Select
        value={pizzaBase}
        label="Pizza Base"
        onChange={(e) => setPizzaBase(e.target.value)}
      >
        {pizzaBaseOptions.map((base, index) => (
          <MenuItem key={index} value={base}>
            {base}
          </MenuItem>
        ))}
      </Select>
      {pizzaBaseError && (
        <FormHelperText error>Please select a pizza base</FormHelperText>
      )}
    </FormControl>
  );
};

export default BaseInput;
