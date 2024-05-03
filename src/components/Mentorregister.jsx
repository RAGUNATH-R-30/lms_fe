import { useFormik } from "formik";
import React, { useState } from "react";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";
import { showToast,ToastManager } from "./ToastManager";

function Mentorregister() {
  const [buttonstate, setbuttonstate] = useState(true);
  const [exist, setexist] = useState(false);
  const [progress, setprogress] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validate: (values) => {
      console.log(values);
      let error = {};
      if (values.email.length === 0) {
        error.email = "Enter the email";
      }
      if (values.username.length === 0) {
        error.username = "Enter the Username";
      }

      if (values.password.length === 0) {
        error.password = "Enter the Password";
      }
      if (values.password.length < 4) {
        error.password = "Enter Password Greater than 4.";
      }
      return error;
    },
    onSubmit: (values) => {
      //   console.log(values);
      setprogress(true);

      userServices
        .mentorRegister(values.email, values.username, values.password)
        .then((response) => {
          setprogress(false);
          showToast(response.data.message)
          setTimeout(() => {
            navigate("/mentorlogin");
          }, 500);
          
        })
        .catch((error) => {
          showToast(error.response.data.message);
          setprogress(false);
        });
      
    },
    
  });
  return (
    <>
    <ToastManager/>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card" style={{ width: "350px" }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-3">Sign Up</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="name@example.com"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingInput">Username</label>

                {formik.getFieldMeta("username").error &&
                  formik.getFieldMeta("username").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("username").error}
                    </span>
                  )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>

                {formik.getFieldMeta("password").error &&
                  formik.getFieldMeta("password").touched && (
                    <span style={{ color: "red" }}>
                      {formik.getFieldMeta("password").error}
                    </span>
                  )}
              </div>
              {exist && (
                <span style={{ color: "red" }}>User Already Exist.</span>
              )}
              {buttonstate ? (
                progress ? (
                  <CircularProgress />
                ) : (
                  <button
                    className="w-100 btn btn-lg btn-primary mt-3"
                    type="submit"
                  >
                    Register
                  </button>
                )
              ) : (
                <span className="text-center" style={{ color: "green" }}>
                  Account activation Link is sent to Your Email.
                </span>
              )}
              <Link
                to={"/login"}
                style={{ textDecoration: "none", fontSize: 18 }}
              >
                Signin
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mentorregister;
