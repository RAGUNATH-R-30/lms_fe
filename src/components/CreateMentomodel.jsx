import React, { useState } from "react";
import userServices from "../services/userServices";
import { ToastManager, showToast } from "./ToastManager";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "./CircularProgress";

function CreateMentomodel({ modalclose,content,getallmentorrequests}) {
    const [showmodal, setshowmodal] = useState(true);
    const [buttonstate, setbuttonstate] = useState(true);
    const [exist, setexist] = useState(false);
    const [progress, setprogress] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: content.email,
          password: "",
          username: content.username,
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
    
          userServices.updatementorRequests({user_id:content.id}).then((res)=>{
            console.log(res)
         }).catch((err)=>{
            console.log(err)
         })

          userServices
            .mentorRegister(values.email, values.username, values.password)
            .then((response) => {
              setprogress(false);
              showToast(response.data.message)
              setTimeout(() => {
                // navigate("/admindashboard");
                getallmentorrequests();
                setshowmodal(false)
                
              }, 500);
            })
            .catch((error) => {
              showToast(error.response.data.message);
              setprogress(false);
            });

            
        },
        
      });
//   const handleClick = async()=>{
//     try {
//         const current_user = await userServices.getCurrentuser();
//         // console.log(current_user.data.user)
//         const requestmentor = await userServices.requestMentor({id:current_user.data.user._id,username:current_user.data.user.username,email:current_user.data.user.email})
//         showToast("Request Sent")
//         setTimeout(() => {
//         modalclose(false)
//         }, 1000);
//         // console.log(requestmentor)
//     } catch (error) {
//         console.log(error)
//     }
//   }
  return (
    <>
    <ToastManager></ToastManager>

      <div
        className={showmodal ? "modal fade show" : "modal fade"}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: showmodal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Mentor
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setshowmodal(false);
                  modalclose(false);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                {/* <h5>Are you Sure you Want to become a mentor?</h5>
                 */}
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
                  id="username"
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
                    type="button"
                    onClick={()=>{formik.handleSubmit()}}
                  >
                    Register
                  </button>
                )
              ) : (
                <span className="text-center" style={{ color: "green" }}>
                  Account activation Link is sent to Your Email.
                </span>
              )}
            </form>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setshowmodal(false);
                  modalclose(false);
                }}
              >
                No
              </button>
              <button type="button" className="btn btn-primary" onClick={()=>{handleClick()}}>
                yes
              </button>
            </div> */}
          </div>
        </div>
      </div>

    </>
    
  );
}

export default CreateMentomodel