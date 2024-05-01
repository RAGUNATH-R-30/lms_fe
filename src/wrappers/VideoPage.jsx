import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
function VideoPage() {
  const { id } = useParams();
  const [activeContent,setActivecontent] = useState("")
  return (
    <>
      <div>{id}</div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-8 mt-3 ">
            <VideoPlayer activeContent={activeContent}></VideoPlayer>
          </div>
          <div className="col-lg-4 col-md-4 mt-4">
            <SideBar setActivecontent={setActivecontent} ></SideBar>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
