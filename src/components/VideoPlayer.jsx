
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import courseServices from "../services/courseServices";
import { useSelector } from "react-redux";

function VideoPlayer({activeContent}) {
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    const data = useSelector((state)=>state.app)
    console.log(data.videos[0].video_url)
    const [url, setUrl] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");
    const { id } = useParams();
    const [key, setKey] = useState(0); // Add key state


    const changeVideo = (newUrl) => {
        console.log("Changing video...");
        setUrl(newUrl);
    };
    const getVideoUrl = async(id)=>{
        try {
            console.log(id)
            const {data} = await courseServices.getVideoUrl({video_id:id})
            console.log(data)
            setUrl(data.video_url)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        console.log(activeContent)
        if(activeContent.id!=undefined){
getVideoUrl(activeContent.id)
        }
        
    },[activeContent])

    return (
        <>
            <video  src={url} width = "1000" height="600" controls>
                {/* <source src={url} type="video/mp4" /> */}
            </video>
            {/* <button onClick={() => changeVideo("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")}>Change Video</button> */}
        </>
    );
}

export default VideoPlayer;


// import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom'

// function VideoPage() {
//     const [url,seturl] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")
//     const {id} = useParams()
//     const changevideo = ()=>{
//         console.log("changed")
//         seturl("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")
//     }
//   return (
//     <>
//      <div>{id}</div>
//      <video width="750" height="500" controls >
//       <source src={url} type="video/mp4"/>
//       </video>

//       <button onClick={()=>changevideo()}>+</button>
//     </>
   
//   )
// }

// export default VideoPage