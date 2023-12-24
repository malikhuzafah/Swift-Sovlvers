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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import AdminDialog from "../../components/AdminDialog/AdminDialog";

export default function AdminOrders() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [orderId, setOrderId] = useState("");

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

  const handleEdit = async (id, status) => {
    console.log(localStorage.getItem("token"));
    axios
      .put(
        `http://localhost:3001/api/orders/${id}`,
        {
          status: status,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setOpenModal(false);
        setOrderId("");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = async () => {
    const users = await axios.get("http://localhost:3001/api/orders/all", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log(users.data);
    setData(users.data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "userId", headerName: "User", width: 220 },
    { field: "paymentMethod", headerName: "Method", width: 130 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "phoneNumber", headerName: "Phone #", width: 150 },
    { field: "total", headerName: "Total", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
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
                setStatus(params.row.status);
                setOpenModal(true);
                setOrderId(params.row.id);
              }}
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
      <h3 className="admin">Orders</h3>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Order# {orderId}</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
          }}
        >
          <FormControl fullWidth sx={{ mt: 2, width: "100%" }}>
            <InputLabel required>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={() => handleEdit(orderId, status)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
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
