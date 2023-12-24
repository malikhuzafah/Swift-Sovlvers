import React from "react";
import "./sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import RocketIcon from "@mui/icons-material/Rocket";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import userService from "../../services/UserService";
import ReportIcon from "@mui/icons-material/Report";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />
              <Link to="/" className="link">
                Home
              </Link>
            </li>

            <li className="sidebarListItem">
              <PersonIcon className="sidebarIcon" />

              <Link to="/users" className="link">
                Users
              </Link>
            </li>
            <li className="sidebarListItem">
              <RocketIcon className="sidebarIcon" />
              <Link to="/inventory" className="link">
                Inventory
              </Link>
            </li>
            <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              <Link to="/admin-orders" className="link">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Account</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LogoutIcon className="sidebarIcon" />
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location = "/login";
                }}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
