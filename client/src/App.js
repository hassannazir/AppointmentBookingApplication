import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import { LoginContext } from "./contexts/loginContext";
import { RegisterContext } from "./contexts/registerContext";
import { UserContext } from "./contexts/userContext";
import { useState } from "react";
import Schedule from "./components/Schedule";
import Doctors from "./components/Doctors";
import Bookings from "./components/Bookings";
import PatientBookings from "./components/PatientBookings.js";

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
                <Route path="/bookings" component={Bookings} />
                <Route path="/patientBookings" component={PatientBookings} />
              </Switch>
            </div>
          </UserContext.Provider>
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
