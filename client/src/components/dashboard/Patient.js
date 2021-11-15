import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const Patient = (props) => {
  return (
    <div className="row col-12">
      <div className="col-4" style={{ margin: "2% 6%" }}>
        <Card className="text-center">
          <Card.Header>Doctors</Card.Header>
          <Card.Body>
            <Card.Title>Online Doctors</Card.Title>
            <Card.Text>Click Below To View Online Doctors.</Card.Text>
            <Link to="/doctors">
              {" "}
              <Button variant="primary">View</Button>
            </Link>
          </Card.Body>
          <Card.Footer className="text-muted">
            Total {props.doctorCount}
          </Card.Footer>
        </Card>
      </div>
      <div className="col-4" style={{ margin: "2% 6%" }}>
        <Card className="text-center">
          <Card.Header>Bookings</Card.Header>
          <Card.Body>
            <Card.Title>Your Appointments</Card.Title>
            <Card.Text>
              Click Below To View Your Appointment's Status.
            </Card.Text>
            <Link to="/patientBookings">
              {" "}
              <Button variant="primary">View</Button>
            </Link>
          </Card.Body>
          <Card.Footer className="text-muted">
            Total {props.pbCount}
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Patient;
