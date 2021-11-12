import DataTable from "react-data-table-component";
import React from "react";
import CustomLoader from "./CustomLoader";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAlert } from "react-alert";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const Patients = (props) => {
  const alert = useAlert();
  const [rows, setRows] = React.useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [isAdd, setisAdd] = React.useState(false);

  var id = props.location.id || cookies.loggedInUser._id;

  const columns = [
    {
      name: "Patient Name",
      selector: (row) => row.patient[0].name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.patient[0].email,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.patient[0].contact,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.patient[0].address,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt.split("T")[0],
      sortable: true,
    },
  ];

  React.useEffect(async () => {
    const timeout = setTimeout(async () => {
      const scheduleList = await axios.get(
        "http://localhost:5000/appointment/patients",
        {
          headers: {
            "auth-token": cookies.token,
          },
        }
      );
      var data = scheduleList.data.data;
      if (data) {
        var filteredData = data.filter((temp, index) => {
          return (
            data.findIndex((item) => item.patientId == temp.patientId) === index
          );
        });
      }
      setRows(filteredData);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ margin: "2%" }}>
      <DataTable
        columns={columns}
        data={rows}
        pagination
        striped
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};
export default Patients;
