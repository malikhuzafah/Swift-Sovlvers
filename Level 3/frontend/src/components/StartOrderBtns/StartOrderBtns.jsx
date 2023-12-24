import React from "react";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StartOrderBtns = ({
  size,
  pizzaBase,
  sauce,
  cheese,
  selectedVeggies,
  quantity,
  setPizzaBaseError,
  setSauceError,
  setCheeseError,
  setVeggiesError,
  setOrderItems,
  orderItems,
  setSuccessOpen,
  setPizzaBase,
  setSauce,
  setCheese,
  setSelectedVeggies,
  setQuantity,
}) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/cart");
    console.log("Pizza Order:", { pizzaBase, sauce, cheese, selectedVeggies });
  };

  const handleValidate = () => {
    console.log("Validating Pizza Order:", {
      pizzaBase,
      sauce,
      cheese,
      selectedVeggies,
    });
    var flag = true;

    if (pizzaBase === "") {
      setPizzaBaseError(true);
      flag = false;
    } else {
      setPizzaBaseError(false);
    }

    if (sauce === "") {
      setSauceError(true);
      flag = false;
    } else {
      setSauceError(false);
    }

    if (cheese === "") {
      setCheeseError(true);
      flag = false;
    } else {
      setCheeseError(false);
    }

    if (selectedVeggies.length === 0) {
      setVeggiesError(true);
      flag = false;
    } else {
      setVeggiesError(false);
    }
    return flag;
  };

  const handleAddToOrder = () => {
    if (!handleValidate()) {
      return;
    }
    const newOrderItem = {
      base: pizzaBase,
      sauce,
      cheese,
      veggies: selectedVeggies,
      size,
      quantity,
      single: size === "Small" ? 700 : size === "Medium" ? 900 : 1200,
      price:
        quantity * (size === "Small" ? 700 : size === "Medium" ? 900 : 1200),
    };

    console.log(localStorage.getItem("token"));

    axios
      .post("http://localhost:3001/api/cartItems", newOrderItem, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrderItems([...orderItems, newOrderItem]);
        setSuccessOpen(true);
        setPizzaBase("");
        setSauce("");
        setCheese("");
        setSelectedVeggies([]);
        setQuantity(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="space-between">
      <Grid item sx={{ width: "48%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToOrder}
          fullWidth
          sx={{
            color: "#efeee5",
            backgroundColor: "#6f2232",
            ":hover": {
              backgroundColor: "#1a1a1d",
            },
            borderRadius: 25,
          }}
          startIcon={<AddIcon />}
        >
          Add to Cart
        </Button>
      </Grid>
      <Grid item sx={{ width: "48%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{
            color: "#efeee5",
            backgroundColor: "#6f2232",
            ":hover": {
              backgroundColor: "#1a1a1d",
            },
            borderRadius: 25,
          }}
          endIcon={<SendIcon />}
        >
          Place Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default StartOrderBtns;
