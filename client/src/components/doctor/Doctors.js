import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Grid from "../grid/Grid";
import Search from "../grid/Search";
import CustomLoader from "../custom/CustomLoader";

const Doctors = (props) => {
  const [prevRows, setPrevRows] = useState([]);
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const [searchDoc, setSearchDoc] = useState("");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [allDocs, setAllDocs] = useState([]);

  useEffect(async () => {
    const fetchDoctors = async (req, res) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/doctor/doctors?page=${page}&limit=${limit}`
        );
        const data = res.data;
        if (data.status) {
          const { data: doctors, pages: totalPages, total, count } = data;
          setRows(doctors);
          setPrevRows(doctors);
          setPages(totalPages);
          setTotalRows(total);
          setRowsPerPage(count);
          setCookie("doctorsCount", total);
          setLoading(false);
        }
      } catch (error) {}
    };
    fetchDoctors();
  }, [page, limit]);

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/doctor/list`);
      const data = res.data;
      if (data.status) {
        const { data: doctors } = data;
        setAllDocs(doctors);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    var d = allDocs.filter((d) => {
      return (
        d.name.includes(searchDoc) ||
        d.address.includes(searchDoc) ||
        d.speciality.includes(searchDoc)
      );
    });
    searchDoc == "" ? setRows(prevRows) : setRows(d);
  }, [searchDoc]);

  return (
    <div style={{ margin: "1% 2%" }}>
      <Search searchDoc={searchDoc} setSearchDoc={setSearchDoc} />
      <div>
        <Grid
          rows={rows}
          page={page}
          setPage={setPage}
          pages={pages}
          total={totalRows}
          rowsPerPage={rowsPerPage}
          setLimit={setLimit}
          progressPending={loading}
          progressComponent={<CustomLoader />}
        ></Grid>
      </div>
    </div>
  );
};
export default Doctors;
