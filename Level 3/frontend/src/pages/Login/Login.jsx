import * as React from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import Auth from "../../components/Auth";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data);
        window.location = "/";
        setError("");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
        console.log(err);
      });
  };

  return (
    <Auth>
      <div className="main">
        <div className="main-content">
          <div className="pad10 text-center">
            <Typography variant="body1" className="main-heading text">
              Welcome to the Pizza Delivery
            </Typography>
          </div>
          <div className="pad10 text-center">
            <Typography variant="h4" className="main-heading text">
              Login
            </Typography>
          </div>
          <div className="pad10">
            <Box width="80%" mx="auto">
              <TextField
                autoFocus
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
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
                  input: {
                    color: "#1a1a1d",
                  },
                }}
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
              variant="contained"
              color="primary"
              sx={{
                color: "#efeee5",
                backgroundColor: "#6f2232",
                ":hover": {
                  backgroundColor: "#1a1a1d",
                  // color: "#6f2232",
                },
              }}
              onClick={handleLogin}
              style={{ borderRadius: 25 }}
            >
              Login
            </Button>
          </div>
          <div className="pad10 text text-center">
            <Typography>
              Dont Have An Account?{" "}
              <Link className="text" to="/register">
                Register
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Login;
