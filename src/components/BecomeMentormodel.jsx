import React, { useState } from "react";
import userServices from "../services/userServices";
import { ToastManager, showToast } from "./ToastManager";

function BecomeMentormodel({ modalclose}) {
  const [showmodal, setshowmodal] = useState(true);
  const handleClick = async()=>{
    try {
        const current_user = await userServices.getCurrentuser();
        // console.log(current_user.data.user)
        const requestmentor = await userServices.requestMentor({id:current_user.data.user._id,username:current_user.data.user.username,email:current_user.data.user.email})
        showToast("Request Sent")
        setTimeout(() => {
        modalclose(false)
        }, 1000);
        // console.log(requestmentor)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
    <ToastManager></ToastManager>
    <form >
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
                Quiz
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
                <h5>Are you Sure you Want to become a mentor?</h5>
              </div>
            </div>
            <div className="modal-footer">
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
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
    
  );
}

export default BecomeMentormodel;
