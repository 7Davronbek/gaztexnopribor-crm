import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { API_PATH } from "../../../../constants";
import { useEffect, useState } from "react";

const EmployeesTable = () => {
  const [staff, setStaff] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 400 },
    {
      field: "full_name",
      headerName: "Ф.И.О",
      width: 400,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      editable: true,
    },
  ];

  const getStaff = () => {
    axios.get(API_PATH + "/user/staff/").then((res) => {
      setStaff(res.data);
    });
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="EmployeesTable TableStyle">
      <div className="cards CardStyle">
        <div className="cardsTop">
          <h2>Сотрудники</h2>
          <h3>Показатели сотрудников</h3>
        </div>
        <div className="line"></div>
        <div style={{ height: 380, width: "100%" }}>
          <DataGrid
            rows={staff}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
