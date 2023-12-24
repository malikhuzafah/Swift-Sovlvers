import React, { useEffect, useState, useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AdminDialog from "../../components/AdminDialog/AdminDialog";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [inventoryId, setInventoryId] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryCategory, setInventoryCategory] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(1);
  const [inventoryDescription, setInventoryDescription] = useState("");
  const [edit, setEdit] = useState(false);

  const handleDelete = async (id) => {
    console.log(localStorage.getItem("token"));
    axios
      .delete(`http://localhost:3001/api/inventories/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async (id, quantity) => {
    console.log(localStorage.getItem("token"));
    axios
      .put(
        `http://localhost:3001/api/inventories/${id}`,
        {
          quantity: quantity,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        close();
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const close = () => {
    setEdit(false);
    setInventoryId("");
    setInventoryName("");
    setInventoryCategory("");
    setInventoryQuantity(1);
    setInventoryDescription("");
  };

  const handleAddInventory = () => {
    axios
      .post(
        "http://localhost:3001/api/inventories",
        {
          name: inventoryName,
          category: inventoryCategory,
          quantity: inventoryQuantity,
          description: inventoryDescription,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOpenModal(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsers = async () => {
    const users = await axios.get("http://localhost:3001/api/inventories", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log(users.data);
    setData(users.data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.quantity <= 0 ? (
              <div style={{ color: "red" }}>{params.row.quantity}</div>
            ) : (
              <div>{params.row.quantity}</div>
            )}
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <EditIcon
              className="doctorListDelete"
              onClick={() => {
                setEdit(true);
                setInventoryId(params.row.id);
                setInventoryName(params.row.name);
                setInventoryCategory(params.row.category);
                setInventoryQuantity(params.row.quantity);
                setInventoryDescription(params.row.description);
              }}
              // onClick={() => handleEdit(params.row.id)}
            />
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <DeleteIcon
              className="doctorListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const rows = useMemo(
    () => data.map((row, index) => ({ ...row, id: row._id })),
    [data]
  );

  return (
    <div style={{ flex: 4 }}>
      <h3 className="admin">Inventory</h3>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setOpenModal(true)}
      >
        Add Inventory
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add Inventory</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
          }}
        >
          <TextField
            label="Inventory Name"
            value={inventoryName}
            onChange={(e) => setInventoryName(e.target.value)}
            style={{ marginTop: "20px" }}
          />{" "}
          <br />
          <TextField
            label="Inventory Category"
            value={inventoryCategory}
            onChange={(e) => setInventoryCategory(e.target.value)}
            style={{ marginTop: "20px" }}
          />{" "}
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
          />{" "}
          <br />
          <TextField
            label="Inventory Description"
            value={inventoryDescription}
            onChange={(e) => setInventoryDescription(e.target.value)}
            style={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleAddInventory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <AdminDialog
        edit={edit}
        setEdit={setEdit}
        inventoryId={inventoryId}
        inventoryName={inventoryName}
        inventoryCategory={inventoryCategory}
        inventoryQuantity={inventoryQuantity}
        setInventoryQuantity={setInventoryQuantity}
        inventoryDescription={inventoryDescription}
        handleEdit={handleEdit}
        close={close}
      />
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
