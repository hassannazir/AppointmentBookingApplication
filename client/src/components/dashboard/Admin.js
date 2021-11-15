import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const Admin = (props) => {
  return (
    <div className="row col-12">
      <div className="col-4" style={{ margin: "2% 6%" }}>
        <Card className="text-center">
          <Card.Header>Doctors</Card.Header>
          <Card.Body>
            <Card.Title>All Registered Doctors</Card.Title>
            <Card.Text>Click Below To View All Active Doctors.</Card.Text>
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
          <Card.Header>Patients</Card.Header>
          <Card.Body>
            <Card.Title>All Registered Patients</Card.Title>
            <Card.Text>Click Below To View All Active Patients.</Card.Text>
            <Link to="/allPatients">
              {" "}
              <Button variant="primary">View</Button>
            </Link>
          </Card.Body>
          <Card.Footer className="text-muted">
            Total {props.allPatientCount}
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
