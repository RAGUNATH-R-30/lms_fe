import React, { useEffect } from "react";
import courseServices from "../services/courseServices";
import { useDispatch, useSelector } from "react-redux";
import { setallcourses } from "../../reducers/courseSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "bootstrap";

function Allcourses() {
  const data = useSelector((state) => state.app);
//   console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleclick = (id)=>{
    console.log(id)
    navigate(`/viewcourse/${id}`)
  }

  const getallcourses = async () => {
    const allcourses = await courseServices.getAllcourses();
    console.log(allcourses.data.allcourses);

    dispatch(setallcourses(allcourses.data.allcourses));
  };


  useEffect(() => {
    if (data.allcourses.length == 0) {
      //   console.log("asdasS");
      getallcourses();
    }
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {data?.allcourses.map((item, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <div className="card mb-4" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {item.author_name}
                    </h6>
                    <p className="card-text">
                      {item.description}
                    </p>
                    <button type="button" className="btn btn-outline-dark"onClick={()=>{handleclick(item._id)}}>View Course</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Allcourses;
