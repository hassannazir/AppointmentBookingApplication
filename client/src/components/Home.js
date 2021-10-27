import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useCookies } from "react-cookie";
import ROLE from "../helpers/role";
import Admin from "../components/dashboard/Admin";
import Doctor from "../components/dashboard/Doctor";
import Patient from "../components/dashboard/Patient";

export default function Home() {
  const [cookies, setCookie] = useCookies("loggedInUser");
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Position",
        field: "position",
        width: 270,
      },
      {
        label: "Office",
        field: "office",
        width: 200,
      },
      {
        label: "Age",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Start date",
        field: "date",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Salary",
        field: "salary",
        sort: "disabled",
        width: 100,
      },
    ],
    rows: [
      {
        name: "Garrett Winters",
        position: "Accountant",
        office: "Tokyo",
        age: "63",
        date: "2011/07/25",
        salary: "$170",
      },
      {
        name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "San Francisco",
        age: "66",
        date: "2009/01/12",
        salary: "$86",
      },
      {
        name: "Cedric Kelly",
        position: "Senior Javascript Developer",
        office: "Edinburgh",
        age: "22",
        date: "2012/03/29",
        salary: "$433",
      },
      {
        name: "Airi Satou",
        position: "Accountant",
        office: "Tokyo",
        age: "33",
        date: "2008/11/28",
        salary: "$162",
      },
      {
        name: "Brielle Williamson",
        position: "Integration Specialist",
        office: "New York",
        age: "61",
        date: "2012/12/02",
        salary: "$372",
      },
      {
        name: "Herrod Chandler",
        position: "Sales Assistant",
        office: "San Francisco",
        age: "59",
        date: "2012/08/06",
        salary: "$137",
      },
      {
        name: "Rhona Davidson",
        position: "Integration Specialist",
        office: "Tokyo",
        age: "55",
        date: "2010/10/14",
        salary: "$327",
      },
    ],
  });

  return (
    <div className="dash-wrapper">
      <div className="inner-dash">
        {console.log(cookies.loggedInUser)}
        {cookies.loggedInUser == null ? (
          <MDBDataTableV5
            hover
            entriesOptions={[10, 15]}
            entries={10}
            pagesAmount={4}
            data={datatable}
            searchTop
            searchBottom={false}
            scrollY
            maxHeight="400px"
            striped
            bordered
          />
        ) : cookies.loggedInUser.role === ROLE.DOCTOR ? (
          <Doctor />
        ) : cookies.loggedInUser.role === ROLE.ADMIN ? (
          <Admin />
        ) : (
          <Patient />
        )}
      </div>
    </div>
  );
}
