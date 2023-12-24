import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const CartItem = ({ item, handleQuantityChange }) => {
  return (
    <ListItem
      key={item._id}
      sx={{ justifyContent: "space-between" }}
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        marginBottom: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <ListItemText
        primary={
          item.sauce +
          " " +
          item.base +
          " (" +
          item.size +
          ")" +
          " PKR " +
          item.price
        }
        secondary={
          "PKR " +
          item.single +
          " | " +
          item.cheese +
          " | " +
          item.veggies.join(", ")
        }
      />
      <ListItemSecondaryAction sx={{ display: "flex", alignItems: "center" }}>
        <input
          type="number"
          value={item.quantity}
          min={1}
          max={10}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "20px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid #000",
            marginRight: "10px",
            marginLeft: "10px",
          }}
          onChange={(e) =>
            handleQuantityChange(item._id, parseInt(e.target.value, 10))
          }
        />
        <IconButton
          color="inherit"
          onClick={() => {
            axios
              .delete(`http://localhost:3001/api/cartItems/${item._id}`, {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              })
              .then((res) => {
                console.log(res.data);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CartItem;
