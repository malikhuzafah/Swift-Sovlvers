import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const SizeInput = ({ size, setSize }) => {
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const getPrice = (size) => {
    // Add logic to get the price based on the selected size
    // You can replace this with your actual pricing logic
    switch (size) {
      case "small":
        return "$10.99";
      case "medium":
        return "$14.99";
      case "large":
        return "$18.99";
      default:
        return "";
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="small"
        value={size}
        onChange={handleSizeChange}
      >
        <FormControlLabel
          value="small"
          control={<Radio />}
          label={
            <>
              Small <Typography variant="caption">(PKR 700)</Typography>
            </>
          }
        />
        <FormControlLabel
          value="medium"
          control={<Radio />}
          label={
            <>
              Medium <Typography variant="caption">(PKR 900)</Typography>
            </>
          }
        />
        <FormControlLabel
          value="large"
          control={<Radio />}
          label={
            <>
              Large <Typography variant="caption">(PKR 1200)</Typography>
            </>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SizeInput;
