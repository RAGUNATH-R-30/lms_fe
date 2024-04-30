import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function VideoPage() {
    const [url,seturl] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")
    const {id} = useParams()
    const changevideo = ()=>{
        console.log("changed")
        seturl("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")
    }
  return (
    <>
     <div>{id}</div>
     <video width="750" height="500" controls >
      <source src={url} type="video/mp4"/>
      </video>

      <button onClick={()=>changevideo()}>+</button>
    </>
   
  )
}

export default VideoPage