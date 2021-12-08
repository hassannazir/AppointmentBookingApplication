import DataTable from "react-data-table-component";
import React from "react";
import CustomLoader from "../custom/CustomLoader";
import axios from "axios";
import { useCookies } from "react-cookie";

import { useAlert } from "react-alert";
import AddSchedule from "./AddSchedule";
import getCSRFToken from "../../helpers/auth/csrfToken";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const Schedule = (props) => {
  const alert = useAlert();
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [isAdd, setisAdd] = React.useState(false);

  var id = props.location.id || cookies.loggedInUser._id;

  const disableSlot = async (e, sid, did) => {
    e.target.disabled = true;
    alert.show("Successfully Booked!");
    await axios.post(
      "http://localhost:5000/appointment/add",
      {
        scheduleId: sid,
        patientId: cookies.loggedInUser._id,
        doctorId: did,
        status: "Pending",
        patient: [cookies.loggedInUser._id],
        schedule: [sid],
        doctor: [did],
      },
      {
        headers: {
          "auth-token": cookies.token,
        },
      }
    );
  };

  const columns = [
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => row.endTime,
      sortable: true,
    },
    {
      cell: (row) => (
        <>
          {cookies.loggedInUser.role === "Patient" && (
            <button
              className={"btn btn-danger btn-sm"}
              onClick={(e) => disableSlot(e, row._id, row.doctorId)}
            >
              Book Slot
            </button>
          )}
        </>
      ),
      button: true,
    },
  ];
  const getScheduleList = async (csrfToken) => {
    setTimeout(async () => {
      const scheduleList = await fetch("http://localhost:5000/schedule/get", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": cookies.token,
          "csrf-token": csrfToken,
        },
        mode: "cors",
        body: JSON.stringify({ id: id }),
      });
      const parsed = await scheduleList.text();
      var { data } = JSON.parse(parsed);
      if (data) {
        data.forEach((schedule) => {
          schedule.startDate = schedule.startDate.split("T")[0];
          schedule.endDate = schedule.endDate.split("T")[0];
        });
        setCookie("scheduleCount", data.length);
      }
      setRows(data);
      setPending(false);
    }, 1000);
  };

  React.useEffect(() => {
    const fetchToken = async () => {
      const csrfToken = await getCSRFToken();
      await getScheduleList(csrfToken);
    };

    fetchToken();

    return () => clearTimeout(getScheduleList);
  }, [isAdd]);

  return (
    <div style={{ margin: "1% 2%" }}>
      <AddSchedule
        role={cookies.loggedInUser.role}
        token={cookies.token}
        setRows={setRows}
        isAdd={isAdd}
        setisAdd={setisAdd}
      />
      <DataTable
        columns={columns}
        data={rows}
        pagination
        striped
        expandableRows
        progressPending={pending}
        progressComponent={<CustomLoader />}
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};
export default Schedule;
