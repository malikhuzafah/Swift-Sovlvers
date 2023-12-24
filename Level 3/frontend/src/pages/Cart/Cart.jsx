import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { useTheme, useMediaQuery, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItems from "../../components/CartItems/CartItems";
import CartForm from "../../components/CartForm/CartForm";

const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = React.useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = React.useState({});

  const getCartItems = async () => {
    const { data } = await axios.get("http://localhost:3001/api/cartItems", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setCartItems(data.cartItems);
  };

  React.useEffect(() => {
    getCartItems();
  }, []);

  const [formData, setFormData] = useState({
    address: "",
    paymentMethod: "card",
    phoneNumber: "",
  });

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateFormData = () => {
    if (formData.address === "") {
      setError("Address is required");
      return false;
    }
    if (formData.phoneNumber === "") {
      setError("Phone Number is required");
      return false;
    }
    if (formData.phoneNumber.length !== 11) {
      setError("Phone Number must be 11 digits long");
      return false;
    }
    return true;
  };

  const handleOrderSubmit = async () => {
    if (!validateFormData()) {
      return;
    }

    console.log("Order Submitted:", { cartItems, formData });
    const { data } = await axios.post(
      "http://localhost:3001/api/orders",
      {
        items: cartItems,
        paymentMethod: formData.paymentMethod,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        total: cartSummary.grandTotal,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(data._id);
    if (formData.paymentMethod === "card") {
      const clientSecret = await axios.get(
        `http://localhost:3001/api/payments/secret?amount=${cartSummary.grandTotal}`
      );
      localStorage.setItem("orderId", data._id);
      navigate("/checkout", { state: clientSecret.data.client_secret });
    }
  };

  return cartItems.length > 0 ? (
    <Container
      maxWidth="100%"
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#feeceb",
        color: "black",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            overflowY: "auto",
            padding: "50px 20px 0 20px",
          }}
        >
          <CartForm
            formData={formData}
            handleFormChange={handleFormChange}
            handleOrderSubmit={handleOrderSubmit}
            error={error}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ padding: isSmallScreen ? "10px 10px" : "50px 20px" }}
        >
          <CartItems
            cartItems={cartItems}
            getCartItems={getCartItems}
            setCartSummary={setCartSummary}
          />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "2%" }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" gutterBottom>
            Add items to your cart to view them here
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Cart;
