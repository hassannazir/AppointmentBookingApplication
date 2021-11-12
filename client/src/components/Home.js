import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import ROLE from "../helpers/role";
import Admin from "../components/dashboard/Admin";
import Doctor from "../components/dashboard/Doctor";
import Patient from "../components/dashboard/Patient";
import Carousel from "react-bootstrap/Carousel";
import logo1 from "../images/whealth1.png";
import logo2 from "../images/whealth2.png";
import logo3 from "../images/whealth3.png";
import { UserContext } from "../contexts/userContext";

export default function Home() {
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const { currentUser, setcurrentUser } = useContext(UserContext);
  return (
    <div>
      {cookies.loggedInUser == null || cookies.loggedInUser == {} ? (
        <Carousel>
          <Carousel.Item>
            <img className="w-50" src={logo3} alt="Second slide" />
            <Carousel.Caption>
              <h3>Find, Book & Consult Doctors</h3>
              <p>How wHealth can help you today?</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="" src={logo2} alt="Scond slide" />
            <Carousel.Caption>
              <h3>Are You Looking For A Doctor?</h3>
              <p>1 Million+ Patients Found Doctors For Them Through wHealth.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="w-50" src={logo1} alt="econd slide" />
            <Carousel.Caption>
              <h3>Find And Book Appointment</h3>
              <p>Find And Book Appointment with verified Doctors.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      ) : cookies.loggedInUser.role === ROLE.DOCTOR ? (
        <Doctor user={cookies.loggedInUser} token={cookies.token} />
      ) : cookies.loggedInUser.role === ROLE.ADMIN ? (
        <Admin />
      ) : (
        <Patient />
      )}
    </div>
  );
}
