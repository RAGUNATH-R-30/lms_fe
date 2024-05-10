import React, { useEffect, useState } from "react";
import userServices from "../services/userServices";
import courseServices from "../services/courseServices";

function Myrequests() {
  const [myrequests, setmyrequests] = useState({});
  const getUserrequest = async () => {
    try {
      const currentUser = await userServices.getCurrentuser();
      console.log(currentUser.data.user._id);
      const userRequest = await userServices.getUserrequest({
        user_id: currentUser.data.user._id,
      });
      console.log(userRequest.data);
      setmyrequests(userRequest.data.user_request);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserrequest();
  }, []);
  return (
    <>
      <div className="container">
        {Object.keys(myrequests).length == 0?(<div className='text-center mt-4'style={{fontSize:20}}>No request Available.</div>):(<div className="card mt-4" style={{ width: "18rem" }}>
          <div className="card-header"style={{fontWeight:"bold"}}>Your Request
          {myrequests?.status == "approved"?(
            <button type="button" className="btn btn-outline-success ms-5" style={{fontSize:14}}>{myrequests?.status}</button>
          ):(<button type="button" className="btn btn-outline-danger ms-4" style={{fontSize:14}}>{myrequests?.status}</button>)}
          

          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Email: {myrequests?.email}</li>
            <li className="list-group-item">UserName: {myrequests?.username}</li>
            <li className="list-group-item">Created At: {myrequests?.createdAt?.slice(0,10)}</li>
          </ul>
        </div>)}
      </div>
    </>
  );
}

export default Myrequests;
