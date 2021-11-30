import DataTable from "react-data-table-component";
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CustomLoader from "../custom/CustomLoader";
import { useAlert } from "react-alert";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const PatientBookings = (props) => {
  const alert = useAlert();
  const [rows, setRows] = React.useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [pending, setPending] = React.useState(true);
  const [isAdd, setisAdd] = React.useState(false);

  var id = props.location.id || cookies.loggedInUser._id;

  const columns = [
    {
      name: "Doctor Name",
      selector: (row) => row.doctor[0].name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.doctor[0].contact,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.schedule[0].startDate.split("T")[0],
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.schedule[0].startTime,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  React.useEffect(async () => {
    const timeout = setTimeout(async () => {
      const scheduleList = await axios.get(
        "http://localhost:5000/appointment/approved",
        {
          headers: {
            "auth-token": cookies.token,
          },
        }
      );
      var data = scheduleList.data.data;
      if (data) setCookie("pbCount", data.length);
      setRows(data);
      setPending(false);
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
        progressPending={pending}
        progressComponent={<CustomLoader />}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};
export default PatientBookings;
