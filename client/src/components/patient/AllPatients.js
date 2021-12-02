import DataTable from "react-data-table-component";
import React from "react";
import axios from "axios";
import CustomLoader from "../custom/CustomLoader";
import { useCookies } from "react-cookie";
import { useAlert } from "react-alert";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const AllPatients = (props) => {
  const alert = useAlert();
  const [rows, setRows] = React.useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [pending, setPending] = React.useState(true);
  const [searchDoc, setSearchDoc] = React.useState("");
  const handleToggle = (e, id) => {
    const items = [...rows];
    items.map(async (row, index) => {
      if (row._id == id) {
        row.status = !row.status;
        const result = await axios.put(
          `http://localhost:5000/admin/changeUserStatus?id=${id}&status=${row.status}`
        );

        result.data.status
          ? row.status
            ? alert.show("Successfully Unblocked")
            : alert.show("Successfully Blocked")
          : alert.show("Error Occurred!");
      }
    });
    setRows(items);
  };

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
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {cookies.loggedInUser.role == "Admin" && (
            <label className="switch">
              <input
                type="checkbox"
                id="toggle"
                checked={row.status}
                onClick={(e) => handleToggle(e, row._id)}
              />
              <span className="slider round"></span>
            </label>
          )}
        </>
      ),
      button: true,
    },
  ];
  React.useEffect(async () => {
    const scheduleList = await axios.get("http://localhost:5000/patient/list", {
      headers: {
        "auth-token": cookies.token,
      },
    });
    var data = scheduleList.data.data;
    if (data) {
      var d = data.filter((d) => {
        return d.name.includes(searchDoc) || d.address.includes(searchDoc);
      });
      setCookie("allPatientCount", data.length);
    }
    setRows(d);
    setPending(false);
  }, [searchDoc]);

  return (
    <div style={{ margin: "1% 2%" }}>
      <div style={{ marginBottom: "1%" }} className="col-2">
        <input
          type="text"
          placeholder="Search Patient"
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
export default AllPatients;
