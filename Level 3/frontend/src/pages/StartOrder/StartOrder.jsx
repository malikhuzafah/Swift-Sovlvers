import React, { useState } from "react";
import {
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import SuccessSnackbar from "../../components/SuccessSnackbar/SuccessSnackbar";
import SelectInput from "../../components/SelectInput/SelectInput";
import VeggiesInput from "../../components/VeggiesInput/VeggiesInput";
import SizeInput from "../../components/SizeInput/SizeInput";
import StartOrderBtns from "../../components/StartOrderBtns/StartOrderBtns";

const StartOrder = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [pizzaBase, setPizzaBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [size, setSize] = useState("small");

  const [pizzaBaseError, setPizzaBaseError] = useState(false);
  const [sauceError, setSauceError] = useState(false);
  const [cheeseError, setCheeseError] = useState(false);
  const [veggiesError, setVeggiesError] = useState(false);

  const pizzaBaseOptions = [
    "Thin Crust",
    "Thick Crust",
    "Whole Wheat",
    "Gluten-Free",
    "Cauliflower Crust",
  ];
  const sauceOptions = ["Marinara", "Barbecue", "Alfredo", "Pesto", "Ranch"];
  const cheeseOptions = [
    "Mozzarella",
    "Cheddar",
    "Parmesan",
    "Provolone",
    "Gouda",
  ];
  const veggieOptions = [
    "Tomatoes",
    "Olives",
    "Mushrooms",
    "Bell Peppers",
    "Onions",
    "Spinach",
    "Broccoli",
    "Jalapeños",
  ];

  return (
    <>
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
      <div className="main">
        <Container
          sx={{
            backgroundColor: "#feeceb",
            color: "black",
            padding: isSmallScreen ? "20px" : "40px 0",
            minHeight: isSmallScreen ? "100vh" : "max-content",
            marginTop: isSmallScreen ? "0" : "64px",
            width: isSmallScreen ? "100%" : "80%",
            borderRadius: isSmallScreen ? "0" : "10px",
          }}
        >
          <Typography variant="h6">Select your pizza</Typography>
          <SelectInput
            pizzaItem={pizzaBase}
            setPizzaItem={setPizzaBase}
            error={pizzaBaseError}
            options={pizzaBaseOptions}
            itemName="Pizza Base"
          />
          <SelectInput
            pizzaItem={sauce}
            setPizzaItem={setSauce}
            error={sauceError}
            options={sauceOptions}
            itemName="Sauce"
          />
          <SelectInput
            pizzaItem={cheese}
            setPizzaItem={setCheese}
            error={cheeseError}
            options={cheeseOptions}
            itemName="Cheese"
          />

          <VeggiesInput
            selectedVeggies={selectedVeggies}
            setSelectedVeggies={setSelectedVeggies}
            veggiesError={veggiesError}
            veggieOptions={veggieOptions}
          />
          <SizeInput size={size} setSize={setSize} />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value, 10)))
            }
            sx={{ mt: 2 }}
          />

          <StartOrderBtns
            pizzaBase={pizzaBase}
            setPizzaBase={setPizzaBase}
            pizzaBaseError={pizzaBaseError}
            setPizzaBaseError={setPizzaBaseError}
            sauce={sauce}
            setSauce={setSauce}
            sauceError={sauceError}
            setSauceError={setSauceError}
            cheese={cheese}
            setCheese={setCheese}
            cheeseError={cheeseError}
            setCheeseError={setCheeseError}
            selectedVeggies={selectedVeggies}
            setSelectedVeggies={setSelectedVeggies}
            veggiesError={veggiesError}
            setVeggiesError={setVeggiesError}
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            successOpen={successOpen}
            setSuccessOpen={setSuccessOpen}
            pizzaBaseOptions={pizzaBaseOptions}
            sauceOptions={sauceOptions}
            cheeseOptions={cheeseOptions}
            veggieOptions={veggieOptions}
            size={size}
            setSize={setSize}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Container>
      </div>
    </>
  );
};

export default StartOrder;
