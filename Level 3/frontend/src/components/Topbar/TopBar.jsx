import React from "react";
import "./topbar.css";
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { AppBar } from "@mui/material";
// import LanguageIcon from '@mui/icons-material/Language';

export default function TopBar() {
  return (
    <div className="topBar">
      <AppBar position="static">
        <div className="topBarWrapper">
          <div className="topLeft">
            <span className="logo">Pizza Delivery.</span>
          </div>
          <div className="topRight">
            <div className="topBarIconContainer">
              {/* <NotificationsNoneIcon />
                    <LanguageIcon /> */}
              <h3 className="admin">Admin Panel</h3>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
}
