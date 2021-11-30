import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/authentication/SignUp.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Header from "./components/dashboard/Header";
import Home from "./components/dashboard/Home";
import { LoginContext } from "./contexts/loginContext";
import { RegisterContext } from "./contexts/registerContext";
import { UserContext } from "./contexts/userContext";
import { useState } from "react";
import Schedule from "./components/doctor/Schedule";
import Doctors from "./components/doctor/Doctors";
import Bookings from "./components/booking/Bookings";
import PatientBookings from "./components/patient/PatientBookings.js";
import DoctorBookings from "./components/doctor/DoctorBookings.js";
import Patients from "./components/patient/Patients";
import AllPatients from "./components/patient/AllPatients";

function App() {
  const [isLogin, setisLogin] = useState(true);
  const [isRegister, setisRegister] = useState(true);
  const [currentUser, setcurrentUser] = useState(null);
  return (
    <Router>
      <LoginContext.Provider value={{ isLogin, setisLogin }}>
        <RegisterContext.Provider value={{ isRegister, setisRegister }}>
          <UserContext.Provider value={{ currentUser, setcurrentUser }}>
            <div className="App">
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/doctors" component={Doctors} />
                <Route path="/allPatients" component={AllPatients} />
                <Route path="/bookings" component={Bookings} />
                <Route path="/patientBookings" component={PatientBookings} />
                <Route path="/patients" component={Patients} />
                <Route path="/doctorBookings" component={DoctorBookings} />
              </Switch>
            </div>
          </UserContext.Provider>
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
