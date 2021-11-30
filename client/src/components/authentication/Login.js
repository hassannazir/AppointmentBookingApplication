import axios from "axios";
import logo from "../../images/whealth.png";
import { useState, useContext } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { UserContext } from "../../contexts/userContext";

const Login = (props) => {
  const alert = useAlert();
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [logInUser, setlogInUser] = useState({ email: "", password: "" });
  const [cookies, setCookie] = useCookies(["loggedInUser", "token"]);
  const onLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:5000/login", logInUser);
    var ctUser = result.data;
    if (ctUser.status) {
      alert.show(ctUser.message);
      setCookie("loggedInUser", ctUser.data[0], { path: "/" });
      setCookie("token", ctUser.token, { path: "/" });
      setcurrentUser({ ...ctUser.data[0] });
      props.history.push("/");
    } else {
      alert.show(ctUser.message);
    }
  };
  return (
    // <div className="auth-wrapper">
    <div>
      <div className="logo">
        <img src={logo} width="200px" height="150px" />
      </div>
      <div className="auth-inner">
        <form onSubmit={onLogin}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) =>
                setlogInUser({ ...logInUser, email: e.target.value })
              }
              value={logInUser.email}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) =>
                setlogInUser({ ...logInUser, password: e.target.value })
              }
              value={logInUser.password}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary col-12">
            Sign In
          </button>
          <p className="forgot-password text-right">Forgot password?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
