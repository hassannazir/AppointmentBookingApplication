import { Link } from "react-router-dom";
import logo from "../whealth.png";
import { useAlert } from "react-alert";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { LoginContext } from "../contexts/loginContext";
import { RegisterContext } from "../contexts/registerContext";

const Header = () => {
  const alert = useAlert();
  const { isLogin, setisLogin } = useContext(LoginContext);
  const { isRegister, setisRegister } = useContext(RegisterContext);
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);

  const onHomeClick = () => {
    setisLogin(true);
    setisRegister(true);
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
    removeCookie("loggedInUser", { path: "/" });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"} onClick={onHomeClick}>
          <img src={logo} alt="app logo" width="110px" height="110px" />{" "}
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav">
            {cookies.loggedInUser == null && isLogin && (
              <li className="nav-item nav-login" onClick={onLoginClick}>
                <Link className=" btn btn-secondary" to={"/sign-in"}>
                  Login
                </Link>
              </li>
            )}
            {cookies.loggedInUser == null && isRegister && (
              <li className="nav-item nav-signup" onClick={onRegisterClick}>
                <Link className="btn btn-secondary sm" to={"/sign-up"}>
                  Register
                </Link>
              </li>
            )}
            {cookies.loggedInUser && (
              <li className="nav-item nav-logout" onClick={onLogoutClick}>
                <Link className="btn btn-secondary sm" to={"/sign-in"}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
