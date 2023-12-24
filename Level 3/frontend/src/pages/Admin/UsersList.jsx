import React, { useEffect, useState, useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import Pro from "../../components/Pro";
import axios from "axios";

export default function UsersList() {
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    console.log(localStorage.getItem("token"));
    axios
      .delete(`http://localhost:3001/api/users/${id}`, {
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

  const getUsers = async () => {
    const users = await axios.get("http://localhost:3001/api/users", {
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
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 130 },
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
    // <Pro>
    <div
      style={{
        flex: 4,
      }}
    >
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
    // </Pro>
  );
}
