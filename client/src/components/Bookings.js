import DataTable from "react-data-table-component";
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const Bookings = (props) => {
  const [rows, setRows] = React.useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [bookingStatus, setBookingStatus] = React.useState(true);
  const approveBooking = async (aid) => {
    await axios.put(
      "http://localhost:5000/appointment/status",
      { status: "Approved", appId: aid },
      {
        headers: {
          "auth-token": cookies.token,
        },
      }
    );
  };
  const cancelBooking = async (aid) => {
    await axios.put(
      "http://localhost:5000/appointment/status",
      { status: "Cancelled", appId: aid },
      {
        headers: {
          "auth-token": cookies.token,
        },
      }
    );
  };
  const columns = [
    {
      name: "Patient Name",
      selector: (row) => row.patient[0].name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.patient[0].contact,
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
      cell: (row) => (
        <>
          <button
            className={"btn btn-success btn-sm"}
            onClick={() => approveBooking(row._id)}
          >
            Approve
          </button>{" "}
        </>
      ),
      button: true,
    },
    {
      cell: (row) => (
        <>
          <Link
            to={{
              pathname: "/bookings",
              id: row._id,
            }}
          >
            <button
              className={"btn btn-danger btn-sm"}
              onClick={() => cancelBooking(row._id)}
            >
              Cancel
            </button>{" "}
          </Link>
        </>
      ),
      button: true,
    },
  ];

  React.useEffect(async () => {
    const bookingList = await axios.get(
      "http://localhost:5000/appointment/list",
      {
        headers: {
          "auth-token": cookies.token,
        },
      }
    );
    var data = bookingList.data.data;
    setRows(data);
  });

  return (
    <div style={{ margin: "1% 2%" }}>
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
export default Bookings;
