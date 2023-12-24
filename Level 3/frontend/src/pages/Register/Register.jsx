import React from "react";
import "./register.css";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../components/Auth";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (email == "" || password == "" || name == "") {
      setError("Please fill all the fields");
      return;
    }
    if (!isValidEmail || !isValidPassword || !isValidName) {
      setError("Please fill all the fields correctly");
      return;
    }
    axios
      .post("http://localhost:3001/api/users/register", {
        email,
        name,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data);
        navigate("/");
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  const isValidEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = () => {
    return password.length >= 8;
  };

  const isValidName = () => {
    return name.length >= 3;
  };

  return (
    // <Auth>
    <div className="main">
      <div className="main-content">
        <div className="pad10 text-center">
          <Typography variant="h3" className="main-heading text">
            Register
          </Typography>
        </div>
        <div className="pad10">
          <Box width="80%" mx="auto">
            <TextField
              required
              autoFocus
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              error={!isValidName() && name != ""}
              helperText={
                !isValidName() && name != ""
                  ? "Name should be atleast 3 characters long"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#1a1a1d",
                },
                "& .MuiInputLabel-root": {
                  color: "#1a1a1d",
                },
                "&:not(.Mui-focused) fieldset": {
                  borderColor: "#1a1a1d",
                },
                "&:not(.Mui-focused):hover fieldset": {
                  borderColor: "#1a1a1d",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1a1a1d", // Set focused label color to white
                },
                input: {
                  color: "#1a1a1d",
                },
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Box>
          {/* <TextField
            label="Name"
            variant="outlined"
            // fullWidth
            value={name}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#efeee5",
              },
              "& .MuiInputLabel-root": {
                color: "#efeee5",
              },
              "&:not(.Mui-focused) fieldset": {
                borderColor: "#efeee5",
              },
              "&:not(.Mui-focused):hover fieldset": {
                borderColor: "#efeee5",
              },
              input: {
                color: "white",
              },
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          /> */}
        </div>
        <div className="pad10">
          <Box width="80%" mx="auto">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              error={!isValidEmail() && email != ""}
              helperText={!isValidEmail() && email != "" ? "Invalid Email" : ""}
              required
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#1a1a1d",
                },
                "& .MuiInputLabel-root": {
                  color: "#1a1a1d",
                },
                "&:not(.Mui-focused) fieldset": {
                  borderColor: "#1a1a1d",
                },
                "&:not(.Mui-focused):hover fieldset": {
                  borderColor: "#1a1a1d",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1a1a1d",
                },
                input: {
                  color: "#1a1a1d",
                },
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Box>
        </div>
        <div className="pad10">
          <Box width="80%" mx="auto">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              error={!isValidPassword() && password != ""}
              helperText={
                !isValidPassword() && password != ""
                  ? "Password should be atleast 8 characters long"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#1a1a1d",
                },
                "& .MuiInputLabel-root": {
                  color: "#1a1a1d",
                },
                "&:not(.Mui-focused) fieldset": {
                  borderColor: "#1a1a1d",
                },
                "&:not(.Mui-focused):hover fieldset": {
                  borderColor: "#1a1a1d",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1a1a1d",
                },
                input: {
                  color: "#1a1a1d",
                },
              }}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Box>
        </div>
        {error != "" && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          </div>
        )}
        <div className="pad10 text-center">
          <Button
            style={{ borderRadius: 25 }}
            variant="contained"
            color="primary"
            sx={{
              color: "#efeee5",
              backgroundColor: "#6f2232",
              ":hover": {
                backgroundColor: "#1a1a1d",
              },
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
        <div className="text-center text">
          <Typography>
            Already have an account?{" "}
            <Link className="text" to="/login">
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
    // </Auth>
  );
};

export default Register;
