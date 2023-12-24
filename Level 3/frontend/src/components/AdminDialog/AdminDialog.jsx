import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const AdminDialog = ({
  edit,
  setEdit,
  inventoryId,
  inventoryName,
  inventoryCategory,
  inventoryQuantity,
  setInventoryQuantity,
  inventoryDescription,
  handleEdit,
  close,
}) => {
  return (
    <Dialog open={edit} onClose={() => setEdit(false)}>
      <DialogTitle>Add Inventory</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
        }}
      >
        <TextField
          disabled
          label="Inventory Name"
          value={inventoryName}
          style={{ marginTop: "20px" }}
        />
        <br />
        <TextField
          disabled
          label="Inventory Category"
          value={inventoryCategory}
          style={{ marginTop: "20px" }}
        />
        <br />
        <TextField
          disabled
          label="Inventory Description"
          value={inventoryDescription}
          style={{ marginTop: "20px" }}
        />
        <br />
        <TextField
          label="Inventory Quantity"
          value={inventoryQuantity}
          type="number"
          onChange={(e) => {
            let value = e.target.value <= 0 ? 1 : e.target.value;
            setInventoryQuantity(value);
          }}
          style={{ marginTop: "20px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>Cancel</Button>
        <Button
          onClick={() => {
            handleEdit(inventoryId, inventoryQuantity);
            setEdit(false);
          }}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialog;
