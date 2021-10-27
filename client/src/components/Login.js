import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
const Login = (props) => {
  const alert = useAlert();
  const [loggedInUser, setloggedInUser] = useState({ email: "", password: "" });
  const [cookies, setCookie] = useCookies(["loggedInUser"]);
  const onLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:5000/login",
      loggedInUser
    );
    var currentUser = result.data;
    if (currentUser.status) {
      alert.show(currentUser.message);
      setCookie("loggedInUser", currentUser.data[0], { path: "/" });
      props.history.push("/");
    } else {
      alert.show(currentUser.message);
    }
  };
  return (
    <div className="auth-wrapper">
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
                setloggedInUser({ ...loggedInUser, email: e.target.value })
              }
              value={loggedInUser.email}
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
                setloggedInUser({ ...loggedInUser, password: e.target.value })
              }
              value={loggedInUser.password}
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
