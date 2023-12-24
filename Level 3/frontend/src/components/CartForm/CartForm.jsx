import React from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const CartForm = ({ formData, handleFormChange, handleOrderSubmit, error }) => {
  const [cartSummary, setCartSummary] = React.useState({});

  const getCartSummary = async () => {
    let cartSummary = await axios.get(
      "http://localhost:3001/api/cartItems/summary",
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(cartSummary.data);
    setCartSummary(cartSummary.data);
  };

  React.useEffect(() => {
    getCartSummary();
  }, []);

  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          marginTop: "10%",
        }}
      >
        Cart Summary
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5%",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Total:
        </Typography>
        <Typography variant="body1" gutterBottom>
          + PKR {cartSummary.total}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Delivery:
        </Typography>
        <Typography variant="body1" gutterBottom>
          + PKR {cartSummary.delivery}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Discount:
        </Typography>
        <Typography variant="body1" gutterBottom>
          - PKR {cartSummary.discount}
        </Typography>
      </div>
      <Divider
        style={{
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Grand Total:
        </Typography>
        <Typography variant="h6" gutterBottom>
          PKR {cartSummary.grandTotal}
        </Typography>
      </div>
      <Typography variant="h6" gutterBottom style={{ marginTop: "10%" }}>
        Address and Payment
      </Typography>
      <TextField
        required
        size="small"
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.address}
        error={error}
        onChange={(e) => handleFormChange("address", e.target.value)}
      />
      <TextField
        required
        size="small"
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.phoneNumber}
        error={error}
        onChange={(e) => handleFormChange("phoneNumber", e.target.value)}
      />
      {error !== "" && <FormHelperText error>{error}</FormHelperText>}

      <TextField
        size="small"
        label="Payment Method"
        variant="outlined"
        fullWidth
        margin="normal"
        select
        value={formData.paymentMethod}
        onChange={(e) => handleFormChange("paymentMethod", e.target.value)}
      >
        <MenuItem value="card">Credit / Debit Card</MenuItem>
        <MenuItem value="COD">COD</MenuItem>
      </TextField>
      <Button
        style={{ borderRadius: 25 }}
        variant="contained"
        color="primary"
        sx={{
          color: "#efeee5",
          backgroundColor: "#6f2232",
          ":hover": {
            backgroundColor: "#1a1a1d",
          },
        }}
        onClick={handleOrderSubmit}
      >
        Place Order
      </Button>
    </>
  );
};

export default CartForm;
