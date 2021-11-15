import DataTable from "react-data-table-component";
import React from "react";
import CustomLoader from "./CustomLoader";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
  },
  {
    name: "License",
    selector: (row) => row.licenseNumber,
    sortable: true,
  },
  {
    name: "Speciality",
    selector: (row) => row.speciality,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
  },
  {
    cell: (row) => (
      <Link
        to={{
          pathname: "/schedule",
          id: row._id,
        }}
      >
        <button className={"btn btn-danger btn-sm"}>Schedule</button>{" "}
      </Link>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const Doctors = (props) => {
  const [rows, setRows] = React.useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [pending, setPending] = React.useState(true);
  const [searchDoc, setSearchDoc] = React.useState("");

  React.useEffect(async () => {
    const scheduleList = await axios.get("http://localhost:5000/doctor/list", {
      headers: {
        "auth-token": cookies.token,
      },
    });
    var data = scheduleList.data.data;
    if (data) {
      var d = data.filter((d) => {
        return (
          d.name.includes(searchDoc) ||
          d.address.includes(searchDoc) ||
          d.speciality.includes(searchDoc)
        );
      });
      setCookie("doctorsCount", data.length);
    }
    setRows(d);
    setPending(false);
  }, [searchDoc]);

  return (
    <div style={{ margin: "1% 2%" }}>
      <div style={{ marginBottom: "1%" }} className="col-2">
        <input
          type="text"
          placeholder="Search Doctor"
          className="form-control"
          value={searchDoc}
          onChange={(e) => setSearchDoc(e.target.value)}
        />
      </div>
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
export default Doctors;
