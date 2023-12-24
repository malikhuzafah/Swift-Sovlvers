import React from "react";
import { List } from "@mui/material";
import CartItem from "../CartItem/CartItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const CartItems = ({ cartItems, getCartItems, setCartSummary }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleQuantityChange = async (id, quantity) => {
    axios
      .put(
        `http://localhost:3001/api/cartItems/${id}`,
        { quantity },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        getCartItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return isSmallScreen ? (
    <Accordion
      defaultExpanded={true}
      style={{
        marginTop: "10%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{}}
      >
        <Typography variant="h6" gutterBottom>
          Cart Items
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  ) : (
    <>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          marginTop: "10%",
        }}
      >
        Cart Items
      </Typography>
      <List>
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            index={index}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </List>
    </>
  );
};

export default CartItems;
