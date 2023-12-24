import React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
  Grid,
} from "@mui/material";

const VeggiesInput = ({
  selectedVeggies,
  setSelectedVeggies,
  veggiesError,
  veggieOptions,
}) => {
  const handleCheckboxChange = (veggie) => {
    if (selectedVeggies.includes(veggie)) {
      setSelectedVeggies(selectedVeggies.filter((v) => v !== veggie));
    } else {
      setSelectedVeggies([...selectedVeggies, veggie]);
    }
  };

  return (
    <FormControl fullWidth sx={{ mt: 2, width: "100%" }}>
      <Typography
        style={{
          color: veggiesError ? "#ff604f" : "#000",
        }}
      >
        Veggies *
      </Typography>
      <FormGroup>
        <Grid container spacing={2}>
          {veggieOptions.map((veggie, index) => (
            <Grid key={index} item xs={6} md={4} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedVeggies.includes(veggie)}
                    onChange={() => handleCheckboxChange(veggie)}
                  />
                }
                label={veggie}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
      {veggiesError && (
        <FormHelperText error>Please select at least 1 veggie</FormHelperText>
      )}
    </FormControl>
  );
};

export default VeggiesInput;
