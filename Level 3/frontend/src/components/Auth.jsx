import React, { useEffect } from "react";
// import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
const Auth = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return <>{props.children}</>;
};

export default Auth;
