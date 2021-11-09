import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import ROLE from "../helpers/role";
import { LoginContext } from "../contexts/loginContext";
import { RegisterContext } from "../contexts/registerContext";

const Signup = (props) => {
  const alert = useAlert();
  const { isLogin, setisLogin } = useContext(LoginContext);
  const { isRegister, setisRegister } = useContext(RegisterContext);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: 0,
    age: 0,
    status: true,
    role: "Patient",
    address: "",
    licenseNumber: "",
    speciality: "",
  });
  const onRegister = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert.show("Passwords not matched!");
    } else {
      try {
        var result = await axios.post(
          "http://localhost:5000/register",
          newUser
        );
        result = result.data;
        if (result.status) {
          setisLogin(false);
          setisRegister(true);
          alert.show(result.message);
          props.history.push("/sign-in");
        } else {
          alert.show(result.message);
        }
      } catch (error) {
        alert.show(error.message);
      }
    }
  };
  const regAsDoc = () => {
    let docF = document.getElementsByClassName("doc-fields");
    let btn = document.getElementById("as-btn");
    let heading = document.getElementById("as-heading");
    if (docF[0].style.display === "block") {
      docF[0].style.display = "none";
      docF[1].style.display = "none";
      btn.innerHTML = "Register as Doctor";
      heading.innerHTML = "Patient Registration";
      setNewUser({ ...newUser, role: ROLE.PATIENT });
    } else {
      docF[0].style.display = "block";
      docF[1].style.display = "block";
      btn.innerHTML = "Register as Patient";
      heading.innerHTML = "Doctor Registration";
      setNewUser({ ...newUser, role: ROLE.DOCTOR });
    }
  };
  return (
    // <div className="auth-wrapper">
    <div className="auth-inner">
      <button class="btn btn-info btn-sm" id="as-btn" onClick={regAsDoc}>
        Register as Doctor
      </button>
      <h3 className="form-h3" id="as-heading">
        Patient Registration
      </h3>
      <form onSubmit={onRegister}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            required
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            value={newUser.name}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            value={newUser.email}
          />
        </div>

        <div className="form-group row">
          <div className="col-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              value={newUser.password}
            />
          </div>

          <div className="col-6">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              value={newUser.confirmPassword}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label>Contact</label>
            <input
              type="number"
              className="form-control"
              placeholder="Contact"
              required
              onChange={(e) =>
                setNewUser({ ...newUser, contact: e.target.value })
              }
              value={newUser.contact}
            />
          </div>
          <div className="col-6">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              required
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              value={newUser.age}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6 doc-fields">
            <label>Speciality</label>
            <input
              type="text"
              className="form-control"
              placeholder="Speciality"
              onChange={(e) =>
                setNewUser({ ...newUser, speciality: e.target.value })
              }
              value={newUser.speciality}
            />
          </div>
          <div className="col-6 doc-fields">
            <label>License Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="License"
              onChange={(e) =>
                setNewUser({ ...newUser, licenseNumber: e.target.value })
              }
              value={newUser.licenseNumber}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            required
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
            value={newUser.address}
          />
        </div>
        <button type="submit" className="btn btn-primary col-12">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <Link to={"/sign-in"}>sign in?</Link>
        </p>
      </form>
    </div>
    // </div>
  );
};

export default Signup;
