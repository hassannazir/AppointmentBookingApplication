import React from "react";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import CustomLoader from "../custom/CustomLoader";
import Pagination from "./Pagination";

const Grid = (props) => {
  const border = {
    borderWidth: "1px",
    borderColor: "#7B7B7B",
    borderStyle: "solid",
  };

  return (
    <div>
      {props.progressPending ? (
        <CustomLoader check={props.page} />
      ) : (
        <Table striped bordered hover variant="light" responsive>
          <thead style={(border, { textAlign: "center" })}>
            <th style={border}>Name</th>
            <th style={border}>Email</th>
            <th style={border}>Contact</th>
            <th style={border}>License</th>
            <th style={border}>Speciality</th>
            <th style={border}>Address</th>
            <th style={border}>Schedule</th>
          </thead>
          <tbody>
            {props.rows.map((row, index) => {
              return (
                <tr key={`${row._id}+${index}`}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.contact}</td>
                  <td>{row.licenseNumber}</td>
                  <td>{row.speciality}</td>
                  <td>{row.address}</td>
                  <td>
                    {" "}
                    <Link
                      to={{
                        pathname: "/schedule",
                        id: row._id,
                      }}
                    >
                      <button className={"btn btn-danger btn-sm"}>
                        Schedule
                      </button>{" "}
                    </Link>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="7">
                <Pagination
                  page={props.page}
                  setPage={props.setPage}
                  pages={props.pages}
                  total={props.total}
                  rowsPerPage={props.rowsPerPage}
                  setLimit={props.setLimit}
                ></Pagination>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Grid;
