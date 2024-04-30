import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import SideBar from '../components/SideBar'
function VideoPage() {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-8 mt-3 ">
                <VideoPlayer></VideoPlayer>
            </div>
            <div className="col-lg-4 mt-4">
                <SideBar></SideBar>
            </div>
        </div>
    </div>
  )
}

export default VideoPage