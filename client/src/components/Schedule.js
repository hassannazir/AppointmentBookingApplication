import DataTable from "react-data-table-component";
import React from "react";
import CustomLoader from "./CustomLoader";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import * as Icon from "react-bootstrap-icons";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

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
  const [newSchedule, setNewSchedule] = React.useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  var id = props.location.id || cookies.loggedInUser._id;

  const disable = async (e, sid, did) => {
    e.target.disabled = true;
    alert.show("Successfully Booked!");
    const appointment = await axios.post(
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
          {cookies.loggedInUser.role == "Patient" && (
            <button
              className={"btn btn-danger btn-sm"}
              onClick={(e) => disable(e, row._id, row.doctorId)}
            >
              Book Slot
            </button>
          )}
        </>
      ),
      button: true,
    },
  ];

  const addSchedule = () => {
    setisAdd(true);
  };
  const onCancel = () => {
    setisAdd(false);
  };
  const addNewSchedule = async () => {
    setisAdd(false);
    const scheduleList = await axios.post(
      "http://localhost:5000/schedule/add",
      newSchedule,
      {
        headers: {
          "auth-token": cookies.token,
        },
      }
    );
    alert.show("Schedule Added!");
  };

  React.useEffect(async () => {
    const timeout = setTimeout(async () => {
      const scheduleList = await axios.post(
        "http://localhost:5000/schedule/get",
        { id },
        {
          headers: {
            "auth-token": cookies.token,
          },
        }
      );
      var data = scheduleList.data.data;
      if (data) {
        data.map((schedule) => {
          schedule.startDate = schedule.startDate.split("T")[0];
          schedule.endDate = schedule.endDate.split("T")[0];
        });
      }
      setRows(data);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return (
    <div style={{ margin: "1% 2%" }}>
      {!isAdd && cookies.loggedInUser.role == "Doctor" && (
        <Button
          variant="success"
          style={{
            display: "flex",
            marginLeft: "auto",
            marginBottom: "0.7%",
          }}
          onClick={addSchedule}
        >
          Add Schedule
        </Button>
      )}

      {isAdd && (
        <div className="auth-inner" style={{ marginBottom: "1%" }}>
          <a href="#">
            {" "}
            <Icon.XCircle
              size={25}
              color="red"
              className="ml-4"
              style={{ marginLeft: "101%", marginTop: "-2%" }}
              onClick={onCancel}
            />
          </a>
          <form>
            <label style={{ display: "flex" }}>Start Date</label>
            <input
              type="date"
              style={{ width: "100%", marginBottom: "0.7%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, startDate: e.target.value })
              }
              value={newSchedule.startDate}
            />
            <label style={{ display: "flex" }}>End Date</label>
            <input
              type="date"
              style={{ width: "100%", marginBottom: "0.7%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, endDate: e.target.value })
              }
              value={newSchedule.endDate}
            />
            <label style={{ display: "flex" }}>Start Time</label>
            <input
              type="time"
              style={{ width: "100%", marginBottom: "0.7%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, startTime: e.target.value })
              }
              value={newSchedule.startTime}
            />
            <label style={{ display: "flex" }}>End Time</label>
            <input
              type="time"
              style={{ width: "100%", marginBottom: "2%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, endTime: e.target.value })
              }
              value={newSchedule.endTime}
            />
            <Button
              variant="primary"
              style={{
                width: "100%",
              }}
              onClick={addNewSchedule}
            >
              Add
            </Button>
          </form>
        </div>
      )}
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
