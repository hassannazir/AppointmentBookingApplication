import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ArrowRight from "react-bootstrap-icons//dist/icons/arrow-right";
import ArrowLeft from "react-bootstrap-icons//dist/icons/arrow-left";
import store from "../redux/store";
import * as actions from "../redux/actions";
const Doctors = (props) => {
  const [rows, setRows] = useState([]);
  const [rowsCopy, setRowsCopy] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [searchDoc, setSearchDoc] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsOnLastPage, setRowsOnLastPage] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const onPageNext = () => {
    if (currentPage < numOfPages) {
      if (currentPage + 1 == numOfPages)
        setRowsPerPage(rowsPerPage + rowsOnLastPage);
      else setRowsPerPage(rowsPerPage + 10);
      setCurrentPage(currentPage + 1);
      setNextPage(true);
    }
  };
  const onPagePrev = () => {
    if (currentPage > 0) {
      if (currentPage == numOfPages)
        setRowsPerPage(rowsPerPage - rowsOnLastPage);
      else setRowsPerPage(rowsPerPage - 10);
      setCurrentPage(currentPage - 1);
    }
  };

  // useEffect(() => {
  //   //const slicedData = rowsCopy.slice(currentPage * 10, rowsPerPage);
  //   console.log(currentPage, rowsPerPage, rowsCopy);
  //   if (currentPage != 0) {
  //     if (nextPage) {
  //       store.dispatch(
  //         actions.onNextClick(currentPage * 10, rowsPerPage, rowsCopy)
  //       );
  //     } else {
  //       store.dispatch(
  //         actions.onPrevClick(currentPage * 10, rowsPerPage, rowsCopy)
  //       );
  //     }
  //   }
  //   console.log(currentPage, "9---", store.getState());
  //   setRows(store.getState()[0].data);
  //   //setRows(slicedData);
  // }, [currentPage, rowsPerPage]);

  useEffect(async () => {
    const scheduleList = await axios.get("http://localhost:5000/doctor/list", {
      headers: {
        "auth-token": cookies.token,
      },
    });
    var data = scheduleList.data.data;

    if (data) {
      setCookie("doctorsCount", data.length);
      setRowsCopy(data);
      setNewRows(data);

      const size = data.length;
      setNumOfPages(Math.ceil(size / 10) - 1);
      setRowsOnLastPage(size % 10);
      if (size < 10) setRowsPerPage(size);

      //const slicedData = data.slice(currentPage * 10, rowsPerPage);
      store.dispatch(actions.initialState(data));
      store.getState();
      store.dispatch(actions.firstPage(currentPage * 10, rowsPerPage));
      console.log(store.getState(), "+++");
      store.dispatch({ type: "None" });
      console.log(store.getState(), "@@");
      setRows(store.getState());
      // setRows(rows);
    }
  }, []);

  useEffect(() => {
    var d = newRows.filter((d) => {
      return (
        d.name.includes(searchDoc) ||
        d.address.includes(searchDoc) ||
        d.speciality.includes(searchDoc)
      );
    });
    searchDoc == "" ? setRows(newRows) : setRows(d);
  }, [searchDoc]);

  const border = {
    borderWidth: "1px",
    borderColor: "#7B7B7B",
    borderStyle: "solid",
  };

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
      <div>
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
            {rows.map((row, index) => {
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
                <span style={{ color: "grey" }}>
                  Rows per page: {currentPage * 10 + 1}-{rowsPerPage} of{" "}
                  {rowsCopy.length}
                </span>
                <button
                  className="btn btn-sm btn-secondary"
                  style={{ marginLeft: "80%" }}
                  onClick={onPagePrev}
                >
                  <ArrowLeft />{" "}
                </button>
                <button
                  style={{ marginLeft: "1%" }}
                  className="btn btn-sm btn-secondary"
                  onClick={onPageNext}
                >
                  <ArrowRight />{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Doctors;
