import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";

function SimpleDialog(props) {
  const navigate = useNavigate();

  const { onClose, selectedValue, open, name } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      style={{ backdropFilter: "blur(2px)" }}
    >
      <DialogTitle>Hi, {name}</DialogTitle>
      <List sx={{ pt: 0 }} style={{ minWidth: "300px" }}>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              handleListItemClick("settings");
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <SettingsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              handleListItemClick("orders");
              navigate("/orders");
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <ListAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Your Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={handleLogout}>
            <ListItemAvatar>
              <Avatar>
                <LogoutIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Lgout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SimpleDialog;

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }
