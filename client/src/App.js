import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import { LoginContext } from "./contexts/loginContext";
import { RegisterContext } from "./contexts/registerContext";
import { useState } from "react";

function App() {
  const [isLogin, setisLogin] = useState(true);
  const [isRegister, setisRegister] = useState(true);
  return (
    <Router>
      <LoginContext.Provider value={{ isLogin, setisLogin }}>
        <RegisterContext.Provider value={{ isRegister, setisRegister }}>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
