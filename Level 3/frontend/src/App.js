import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import StartOrder from "./pages/StartOrder/StartOrder";
import NotFound from "./pages/NotFound";
import MenuBar from "./components/MenuBar/MenuBar";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import axios from "axios";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import { jwtDecode } from "jwt-decode";
import TopBar from "./components/Topbar/TopBar";
import AdminHome from "./pages/Admin/AdminHome";
import Sidebar from "./components/Sidebar/Sidebar";
import UsersList from "./pages/Admin/UsersList";
import Inventory from "./pages/Admin/Inventory";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  const [cartNumber, setCartNumber] = React.useState(0);
  const [user, setUser] = React.useState(null);

  const getCartItems = async () => {
    const { data } = await axios.get("http://localhost:3001/api/cartItems", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setCartNumber(data.cartItems.length);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCartItems();
      setUser(jwtDecode(localStorage.getItem("token")).role);
    }
  }, []);

  return (
    <Router>
      <div>
        {user === "admin" ? <TopBar /> : <MenuBar cartNumber={cartNumber} />}
        <div>
          {user === "admin" ? (
            <div
              style={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <Sidebar />
              <Routes>
                <Route path="/users" element={<UsersList />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/admin-orders" element={<AdminOrders />} />
                <Route path="/" element={<AdminHome />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/start-order" element={<StartOrder />}></Route>
              <Route
                path="/cart"
                element={
                  <Cart cartNumber={cartNumber} setCartNumber={setCartNumber} />
                }
              ></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="/order-summary" element={<OrderSummary />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
