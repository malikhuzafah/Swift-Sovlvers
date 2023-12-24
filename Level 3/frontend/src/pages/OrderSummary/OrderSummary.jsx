import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OrderSummary = () => {
  const { state } = useLocation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const payment = queryParams.get("payment");
  const orderId = queryParams.get("orderId");
  const [order, setOrder] = React.useState(
    payment
      ? {
          _id: "",
          address: "",
          items: [],
          total: 0,
          status: "",
          createdAt: "",
        }
      : state
  );

  const getOrder = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/orders/single/${orderId}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    setOrder(data);
  };

  const emptyCart = async () => {
    await axios.delete("http://localhost:3001/api/cartItems", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  };

  useEffect(() => {
    if (payment) {
      getOrder();
      emptyCart();
    }
  }, []);

  return (
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
          {payment && (
            <Alert severity="success" style={{ marginBottom: "2%" }}>
              Order has been successfully placed!
            </Alert>
          )}

          <Typography variant="h4" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="body1" gutterBottom>
            Order ID: {order._id}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Order Date:
            {new Date(order.createdAt).toLocaleString()}
          </Typography>
          <List>
            {order.items.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      item.sauce + " " + item.base + " (" + item.size + ")"
                    }
                    secondary={`Quantity: ${
                      item.quantity
                    } - Price: PKR ${item.price.toFixed(2)}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <Typography variant="h6" style={{ marginTop: "2%" }}>
            Total Amount: PKR {order.total.toFixed(2)}
          </Typography>
          <Typography variant="h6" style={{ marginTop: "2%" }}>
            Shipping Address:
          </Typography>
          <Typography>{order.address}</Typography>
          <Typography variant="h6" style={{ marginTop: "2%" }}>
            Status: {order.status}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default OrderSummary;
