
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import courseServices from "../services/courseServices";
import { useDispatch, useSelector } from "react-redux";
import { setvideos } from "../../reducers/courseSlice";

function VideoPlayer({activeContent}) {
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.app)
    console.log(data)
    // const videoUrl = data?.videos?.[0]?.video_url || '';
    // console.log(videoUrl);
    const [url, setUrl] = useState("");
    const { id } = useParams();
    const [key, setKey] = useState(0); // Add key state
    // console.log(data.videos[0].video_url)
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
    // const getAllvideos = async()=>{
    //     try {
    //         const allvideos = await courseServices.getAllvideos({course_id:id})
            
    //         dispatch(setvideos(allvideos.data.videos))
            
    //         console.log(allvideos.data.videos)
    //       } catch (error) {
    //         console.log(error)
    //       }
    // }
    useEffect(()=>{
        console.log(activeContent)
        // if(data.videos.length == 0){
        //     getAllvideos()
        // }
        if(activeContent.id!=undefined){
getVideoUrl(activeContent.id)
        }
        
    },[activeContent])

    return (
        <>
            <video  src={url}  width = "100%" height="600" controls>
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