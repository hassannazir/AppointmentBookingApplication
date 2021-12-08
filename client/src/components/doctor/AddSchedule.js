import React from "react";
import * as Icon from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAlert } from "react-alert";
import getCSRFToken from "../../helpers/auth/csrfToken";

const AddSchedule = (props) => {
  const alert = useAlert();

  const [newSchedule, setNewSchedule] = React.useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const addSchedule = () => {
    props.setisAdd(true);
  };
  const onCancel = () => {
    props.setisAdd(false);
  };
  const addNewSchedule = async () => {
    props.setisAdd(false);
    const csrfToken = await getCSRFToken();
    await fetch("http://localhost:5000/schedule/add", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": props.token,
        "csrf-token": csrfToken,
      },
      mode: "cors",
      body: JSON.stringify(newSchedule),
    });
    alert.show("Schedule Added!");
    setNewSchedule({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
  };
  return (
    <div>
      {" "}
      {!props.isAdd && props.role === "Doctor" && (
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
      {props.isAdd && (
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
          <form onSubmit={addNewSchedule}>
            <label style={{ display: "flex" }}>Start Date</label>
            <input
              type="date"
              style={{ width: "100%", marginBottom: "0.7%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, startDate: e.target.value })
              }
              value={newSchedule.startDate}
              required
            />
            <label style={{ display: "flex" }}>End Date</label>
            <input
              type="date"
              style={{ width: "100%", marginBottom: "0.7%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, endDate: e.target.value })
              }
              value={newSchedule.endDate}
              required
            />
            <label style={{ display: "flex" }}>Start Time</label>
            <input
              type="time"
              style={{ width: "100%", marginBottom: "0.7%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, startTime: e.target.value })
              }
              value={newSchedule.startTime}
              required
            />
            <label style={{ display: "flex" }}>End Time</label>
            <input
              type="time"
              style={{ width: "100%", marginBottom: "2%" }}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, endTime: e.target.value })
              }
              value={newSchedule.endTime}
              required
            />
            <Button
              variant="primary"
              style={{
                width: "100%",
              }}
              type="submit"
            >
              Add
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddSchedule;
