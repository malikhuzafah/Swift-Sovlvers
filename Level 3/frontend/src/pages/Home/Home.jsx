import * as React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="main">
      <div className="main-content">
        <div className="pad10 text-center">
          <Typography variant="h4" className="main-heading text">
            Welcome to the Pizza Delivery
          </Typography>
          <Button
            style={{ borderRadius: 25, marginTop: "10px" }}
            variant="contained"
            color="primary"
            sx={{
              color: "#efeee5",
              backgroundColor: "#6f2232",
              ":hover": {
                backgroundColor: "#1a1a1d",
              },
            }}
            onClick={() => {
              token ? navigate("/start-order") : navigate("/login");
            }}
          >
            Start Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
