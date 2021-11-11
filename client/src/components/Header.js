import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { LoginContext } from "../contexts/loginContext";
import { RegisterContext } from "../contexts/registerContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { UserContext } from "../contexts/userContext";
import Role from "../helpers/role";

const Header = () => {
  const alert = useAlert();
  const { isLogin, setisLogin } = useContext(LoginContext);
  const { isRegister, setisRegister } = useContext(RegisterContext);
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);
  const { currentUser, setcurrentUser } = useContext(UserContext);

  const onHomeClick = () => {
    setisLogin(true);
    setisRegister(true);
    console.log(currentUser);
  };
  const onLoginClick = () => {
    setisLogin(false);
    setisRegister(true);
  };
  const onRegisterClick = () => {
    setisLogin(true);
    setisRegister(false);
  };
  const onLogoutClick = () => {
    setisLogin(false);
    setisRegister(true);
    alert.show("Successfully Logged out!");
    setcurrentUser(null);
    removeCookie("loggedInUser", { path: "/" });
    removeCookie("token", { path: "/" });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"> wHealth</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {" "}
            <Link className="nav-link" to={"/"} onClick={onHomeClick}>
              <Button variant="outline-secondary">Home</Button>
            </Link>
            {currentUser
              ? currentUser.role === Role.DOCTOR && (
                  <Link className="nav-link" to={"/"}>
                    <Button variant="outline-secondary">Patients</Button>
                  </Link>
                )
              : ""}
            {currentUser
              ? currentUser.role === Role.DOCTOR && (
                  <Link className="nav-link" to={"/bookings"}>
                    <Button variant="outline-secondary">Bookings</Button>
                  </Link>
                )
              : ""}
            {currentUser
              ? currentUser.role === Role.DOCTOR && (
                  <Link className="nav-link" to={"/schedule"}>
                    <Button variant="outline-secondary">Schedule</Button>
                  </Link>
                )
              : ""}
            {currentUser
              ? currentUser.role === Role.PATIENT && (
                  <Link className="nav-link" to={"/doctors"}>
                    <Button variant="outline-secondary">Doctors</Button>
                  </Link>
                )
              : ""}
            {currentUser
              ? currentUser.role === Role.PATIENT && (
                  <Link className="nav-link" to={"/patientBookings"}>
                    <Button variant="outline-secondary">My Appointments</Button>
                  </Link>
                )
              : ""}{" "}
            {console.log(currentUser)}
          </Nav>
          {cookies.loggedInUser == null && isLogin && (
            <Link
              style={{ color: "black" }}
              className="nav-link"
              to={"/sign-in"}
              onClick={onLoginClick}
            >
              <Button variant="outline-success">Sign in</Button>
            </Link>
          )}
          {cookies.loggedInUser == null && isRegister && (
            <Link
              className="nav-link"
              to={"/sign-up"}
              onClick={onRegisterClick}
            >
              {" "}
              <Button variant="outline-success">Register</Button>
            </Link>
          )}
          {cookies.loggedInUser && (
            <Link className="nav-link" to={"/sign-in"} onClick={onLogoutClick}>
              <Button variant="outline-danger"> Logout</Button>
            </Link>
          )}
          {/* <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
