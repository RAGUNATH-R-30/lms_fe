import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import courseServices from "../services/courseServices";
import { useDispatch } from "react-redux";
import { setvideos } from "../../reducers/courseSlice";
import userServices from "../services/userServices";

export async function loader() {
  // get the currently logged in user
  const user = await userServices.getCurrentuser();
  console.log(user);
  // return the user data
  return { user };
}

function VideoPage() {
  const { id } = useParams();
  const [activeContent,setActivecontent] = useState("")
  const [course, setcourse] = useState([]);

  // const { user } = useLoaderData();
  const dispatch = useDispatch()
  const getcourse = async (id) => {
    try {
      // const course = await courseServices.getCoursebyId({course_id:id})
      console.log("GetV");
      courseServices
        .getCoursebyId({ course_id: id })
        .then((response) => {
          console.log("asdasdasdsadsada");
          const course = response.data.course;
          console.log(course);
          setcourse(course);
          // setsections(course.sections);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getallvideos = async(id)=>{
    try {
      const allvideos = await courseServices.getAllvideos({course_id:id})
      // dispatch(setvideos(allvideos.data.videos))
      // console.log(allvideos.data.videos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getallvideos(id)
    getcourse(id)
  },[])
  return (
    <>
      {/* <div>{id}</div> */}
      <div className="container">
        <h3 className="mt-3">{course?.name}</h3>
        <div className="row">
          <div className="col-lg-12 col-md-11 mt-3 ">
            <VideoPlayer activeContent={activeContent}></VideoPlayer>
          </div>
          <div className="col-lg-12 col-md-12 mt-4">
            <SideBar setActivecontent={setActivecontent} ></SideBar>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
