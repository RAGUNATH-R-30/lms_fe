import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import courseServices from "../services/courseServices";
import { useDispatch } from "react-redux";
import { setvideos } from "../../reducers/courseSlice";

function VideoPage() {
  const { id } = useParams();
  const [activeContent,setActivecontent] = useState("")
  const dispatch = useDispatch()
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

  })
  return (
    <>
      <div>{id}</div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-6 mt-3 ">
            <VideoPlayer activeContent={activeContent}></VideoPlayer>
          </div>
          <div className="col-lg-4 col-md-6 mt-4">
            <SideBar setActivecontent={setActivecontent} ></SideBar>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
