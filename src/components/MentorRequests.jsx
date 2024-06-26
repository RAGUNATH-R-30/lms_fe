import React, { useEffect, useState } from "react";
import userServices from "../services/userServices";
import CreateMentomodel from "./CreateMentomodel";
import { useToast } from "react-toastify";

function MentorRequests() {
  const [mentorrequests, setmentorrequests] = useState([]);
  const [modalstate, setshowmodal] = useState(false);
  const [currentcontent,setcurrentcontent] = useState({})

  console.log(mentorrequests);

  let modalclose = (bool) => {
    setshowmodal(bool);
  };

  const handleclick = async (item) => {
    console.log(item);
    setshowmodal(true)
    setcurrentcontent(item)
  };
  const getallmentorrequests = async () => {
    const allrequests = await userServices.getmentorRequests();
    setmentorrequests(allrequests.data.allrequests);
    console.log(allrequests.data);
  };
  useEffect(() => {
    getallmentorrequests();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4">
        {mentorrequests?.map((item, index) => {
          return (
            <div className="col-lg-4" key={index}>
              <div className="card mb-4" style={{ width: "21rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Email:{item.email}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Username :{item.username}
                  </h6>
                  <span className="card-text">User id : {item.id}</span>
                  <br />
                  {/* <b style={{fontSize:20}}>asdasd</b> */}
                  <br />
                  {item.status == "notapproved" ? (
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => {
                        handleclick(item);
                      }}
                    >
                      Create Mentor
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      disabled
                    >
                      Mentor Created
                    </button>
                  )}
                </div>
              </div>
            </div>
          );


        })}
      </div>
      {modalstate && <CreateMentomodel modalclose={modalclose} content={currentcontent} getallmentorrequests={getallmentorrequests}/>}

    </div>
  );
}

export default MentorRequests;
