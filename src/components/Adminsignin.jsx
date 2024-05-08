import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import userServices from "../services/userServices";
import { ToastManager, showToast } from "./ToastManager";

function Adminsignin() {
    const navigate = useNavigate();
    const [progress, setprogress] = useState(false);
    const [invalidcred, setinvalidcred] = useState(false);
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: (values) => {
        let error = {};
        if (values.email.length == 0) {
          error.email = "Enter the Email";
        }
        if (values.password.length == 0) {
          error.password = "Enter the password";
        }
        return error;
      },
      onSubmit: (values) => {
        setprogress(true);
        console.log(values)
        userServices
          .adminLogin(values.email, values.password)
          .then((response) => {
              console.log(response.data)
              console.log(response.data.token)
              // Cookies.set('token',response.data.token)
            showToast(response.data.message);
            navigate('/dashboard')
            setprogress(false);
          })
          .catch((error) => {
            showToast(error.response.data.message);
            setprogress(false);
          });
      },
    });
    return (
      <>
      <ToastManager></ToastManager>
       <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card" style={{ width: "350px" }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-3">Admin Login</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <label htmlFor="floatingInput">Email address</label>
                {formik.getFieldMeta("email").error &&
                  formik.getFieldMeta("email").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("email").error}
                    </span>
                  )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label htmlFor="floatingPassword">Password</label>
                {formik.getFieldMeta("password").error &&
                  formik.getFieldMeta("password").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("password").error}
                    </span>
                  )}
              </div>
              {invalidcred && (
                <span style={{ color: "red" }}>Invalid Credentials</span>
              )}
              {progress ? (
                <CircularProgress></CircularProgress>
              ) : (
                <button
                  className="w-100 btn btn-lg btn-primary mt-3"
                  type="submit"
                >
                  Login
                </button>
              )}
            </form>
            <div className="row mt-2">
              <div className="col-lg-6">
                <Link
                  to="/register"
                  style={{ fontWeight: "500", textDecoration: "none" }}
                >
                  Sign up?
                </Link>
              </div>
              <div className="col-lg-6">
                <Link
                  to="/forgotpassword"
                  style={{ fontWeight: "500", textDecoration: "none" }}
                >
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div></>
     
    );
}

export default Adminsignin