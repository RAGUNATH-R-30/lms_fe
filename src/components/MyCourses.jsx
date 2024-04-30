import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import courseServices from "../services/courseServices";
import userServices from "../services/userServices";
import { setmycourses } from "../../reducers/courseSlice";
import { Link } from "react-router-dom";
function MyCourses() {
  const data = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const getCourses = async () => {
    try {
      const user = await userServices.getCurrentuser();
      const user_id = user.data.user._id;
      console.log(user);
      courseServices
        .getMycourses({ mentor_id: user_id })
        .then((res) => {
          const mycourses = res.data.myCourses;
          dispatch(setmycourses(mycourses));
          console.log(mycourses);
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick= (id)=>{
    console.log(id)
  }

  useEffect(() => {
    // if (data.mycourses.length == 0) {
      getCourses();
    // }
  }, []);
  return (
    <>
      <div className="container">
        <div className="row mt-4">

          {
            data.mycourses.map((item,index)=>{
                return <div className="col-lg-3"key ={index}>
                <Link to={`/videopage/video/${item._id}`} className="card" style={{width: "18rem",textDecoration:"none"}} onClick={()=>{handleClick(item._id)}}>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {item.author_name}
                    </h6>
                    <p className="card-text">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            })
          }


        </div>
      </div>
    </>
  );
}

export default MyCourses;
