import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Doctor = (props) => {
  return (
    <>
      <div className="row col-12">
        <div className="col-4" style={{ margin: "2% 6%" }}>
          <Card className="text-center">
            <Card.Header>Patients</Card.Header>
            <Card.Body>
              <Card.Title>Your Patients</Card.Title>
              <Card.Text>Click Below To View All Patients.</Card.Text>
              <Link to="/patients">
                {" "}
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              Total {props.patientCount}
            </Card.Footer>
          </Card>
        </div>
        <div className="col-4" style={{ margin: "2% 6%" }}>
          <Card className="text-center">
            <Card.Header>Bookings</Card.Header>
            <Card.Body>
              <Card.Title>Booking Requests</Card.Title>
              <Card.Text>
                Click Below To View All Pending Booking Requests.
              </Card.Text>
              <Link to="/bookings">
                {" "}
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              Total {props.pendingCount}
            </Card.Footer>
          </Card>
        </div>
      </div>
      <div className="row col-12">
        <div className="col-4" style={{ margin: "2% 6%" }}>
          <Card className="text-center">
            <Card.Header>Schedule</Card.Header>
            <Card.Body>
              <Card.Title>Set Slots</Card.Title>
              <Card.Text>Click Below To View & Adjust Booking Slots.</Card.Text>
              <Link to="/schedule">
                {" "}
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              Total {props.scheduleCount}
            </Card.Footer>
          </Card>
        </div>
        <div className="col-4" style={{ margin: "2% 6%" }}>
          <Card className="text-center">
            <Card.Header>Appointments</Card.Header>
            <Card.Body>
              <Card.Title>Approved Appointments</Card.Title>
              <Card.Text>
                Click Below To View Your Booked Appointments.
              </Card.Text>
              <Link to="/doctorBookings">
                {" "}
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              Total {props.requestCount}
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Doctor;
