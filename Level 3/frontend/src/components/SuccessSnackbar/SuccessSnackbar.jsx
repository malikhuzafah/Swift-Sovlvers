import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessSnackbar = ({ successOpen, setSuccessOpen }) => {
  const handleClose = () => {
    setSuccessOpen(false);
  };

  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={successOpen}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        variant="filled"
      >
        Pizza added to cart!
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
