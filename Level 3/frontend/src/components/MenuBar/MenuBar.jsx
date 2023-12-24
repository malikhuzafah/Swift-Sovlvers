import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import SimpleDialog from "../Dialog/Dialog";
import { jwtDecode } from "jwt-decode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MenuBar = ({ cartNumber }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] =
    React.useState("username@gmail.com");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "#feeceb",
        padding: isSmallScreen ? "0 0" : "0 30px",
      }}
    >
      <Toolbar>
        {window.location.pathname != "/" && (
          <IconButton
            color="inherit"
            onClick={handleBack}
            style={{
              backgroundColor: "#6f2232",
              color: "#fff",
              marginRight: "30px",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Button
            variant="text"
            style={{ color: "#000" }}
            onClick={() => navigate("/")}
          >
            <Typography variant="h6">Pizza App</Typography>
          </Button>
        </Box>
        {token ? (
          <>
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartNumber} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleClickOpen}>
              <PersonIcon />
            </IconButton>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              name={jwtDecode(token).name}
            />
          </>
        ) : (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" && (
            <Button
              variant="contained"
              sx={{
                color: "#efeee5",
                backgroundColor: "#6f2232",
                ":hover": {
                  backgroundColor: "#1a1a1d",
                },
                marginRight: "30px",
                borderRadius: "25px",
              }}
              onClick={() => navigate("/login")}
            >
              <PersonIcon style={{ marginRight: "10px" }} />
              Login
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
