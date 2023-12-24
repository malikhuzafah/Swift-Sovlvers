import React from "react";
import {
  Accordion,
  Container,
  Grid,
  List,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);

  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:3001/api/orders", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log(data);
    setOrders(data);
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: "#feeceb",
        color: "black",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        style={{
          marginTop: "100px",
        }}
      >
        Orders
      </Typography>
      <List
        style={{
          marginBottom: "5%",
        }}
      >
        {orders.map((order) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Order #{order._id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" gutterBottom>
                    Address: {order.address}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Phone Number: {order.phoneNumber}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Payment Method: {order.paymentMethod}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" gutterBottom>
                    Total: {order.total}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Status: {order.status}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate("/order-summary", { state: order });
                    }}
                  >
                    Summary
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Container>
  );
};

export default Orders;
