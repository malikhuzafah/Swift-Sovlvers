import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const SelectInput = ({ pizzaItem, setPizzaItem, error, itemName, options }) => {
  return (
    <FormControl fullWidth sx={{ mt: 2, width: "100%" }} error={error}>
      <InputLabel required>{itemName}</InputLabel>
      <Select
        value={pizzaItem}
        label={itemName}
        onChange={(e) => setPizzaItem(e.target.value)}
      >
        {options.map((itemType, index) => (
          <MenuItem key={index} value={itemType}>
            {itemType}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText error>Please select a {itemName}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
