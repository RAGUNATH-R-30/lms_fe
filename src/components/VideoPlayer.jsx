
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function VideoPlayer() {
    const [url, setUrl] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");
    const { id } = useParams();
    const [key, setKey] = useState(0); // Add key state

    useEffect(() => {
        // Whenever 'url' changes, increment 'key' to force re-render of the video element
        setKey(prevKey => prevKey + 1);
    }, [url]);

    const changeVideo = (newUrl) => {
        console.log("Changing video...");
        setUrl(newUrl);
    };

    return (
        <>
            <div>{id}</div>
            <video key={key}  width = "1200" height="600" controls>
                <source src={url} type="video/mp4" />
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