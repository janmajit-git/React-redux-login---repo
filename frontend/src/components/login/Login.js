import React from "react";
import "./Login.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [messageNote, setMessageNote] = useState("");
  const [style, setStyle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var loggedUser = "";


  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmit(false);
      axios.post("http://localhost:9002/Login", {
        formValues
      })
      .then(async (res) => {
        if(res.data.message === "successfull"){
          setStyle("success-msg");
          setMessageNote("Logged in Successfully !");
          loggedUser = res.data.firstName;
          await localStorage.setItem('token', loggedUser);
          dispatch(logIn(loggedUser));
          setTimeout(() => {
            navigate("/Homepage", {replace : true})
          }, 1000);
        }
        else{
          setStyle("err-msg");
          setMessageNote(res.data.message);
        }        
      })
      .catch(error => console.error(error));

      
    }
  }, [formErrors]);

  

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
  <>
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-10 offset-xs-1 form-container">
          <div className="row">
            <div className="col-12">
              <h2 className="form-heading text-center text-muted">
                Signin
              </h2>
            </div>
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={formValues.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <p className="err-msg text-muted">{formErrors.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter password"
                  value={formValues.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <p className="err-msg text-muted">{formErrors.password}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block btn-signin">
                  Sign In
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="comment text-center text-muted">
                  Don't have account?
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type ="button" onClick={() => navigate("Register")} className="btn btn-primary btn-block btn-register">
                  Register
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className={`${style} text-center text-muted`}>
                  {messageNote}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
