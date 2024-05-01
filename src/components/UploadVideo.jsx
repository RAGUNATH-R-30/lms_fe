import React from "react";
import { useSelector } from "react-redux";
import courseServices from "../services/courseServices";

function UploadVideo() {
  const data = useSelector((state) => state.app);
  const course = data.course.course;
  console.log(course);
  console.log(course.sections[0].section1);
  console.log(course.sections[0].section2);

  console.log(course.sections[0].section3);


  const handleClick = (id) => {
    console.log(id);
    courseServices.uploadvideo({video_id:id,course_id:course._id}).then((res)=>{
        console.log(res.data.message)
    }).catch((error)=>{
        console.log(error.response.data.message)
    })
  };
  return (
    <div className="container">
      {/* Course Details */}
      <div className="card mt-5 mb-4">
        <h5 className="card-header">Course Details</h5>
        <div className="card-body">
          {<h5>{`Author: ${course.author_name}`}</h5>}
          {<h5>{`Course: ${course.name}`}</h5>}
          {<h5>{`Description: ${course.description}`}</h5>}
        </div>
      </div>

      {/* Beginner module */}
      <div className="card mt-5 mb-4">
        <h5 className="card-header">Beginner module</h5>
        <div className="card-body">
          {course.sections[0].sectionContent.map((item, index) => {
            return (
              <div className="card" key={index}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="card-body">
                      {/* {item.id} */}
                      {/* {item.content} */}
                      <h5>{`${index + 1}. ${item.content}`}</h5>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="mt-3 mx-2">
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleClick(item.id)}
                      >
                        Upload Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intermediate Module */}

      <div className="card mb-4">
        <h5 className="card-header">Intermediate Module</h5>
        <div className="card-body">
          {course.sections[1].sectionContent.map((item, index) => {
            return (
              <div className="card" key={index}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="card-body">
                      {/* {item.id} */}
                      <h5>{`${index + 1}. ${item.content}`}</h5>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="mt-3 mx-2">
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleClick(item.id)}
                      >
                        Upload Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* advanced module */}

      <div className="card">
        <h5 className="card-header">Advanced module </h5>
        <div className="card-body">
          {course.sections[2].sectionContent.map((item, index) => {
            return (
              <div className="card"key={index}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="card-body">
                      {/* {item.id} */}
                      <h5>{`${index + 1}. ${item.content}`}</h5>
                    </div>
                  </div>
                  
                  <div className="col-lg-3">
                    <div className="mt-3 mx-2">
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleClick(item.id)}
                      >
                        Upload Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// function UploadVideo() {
//   const data = useSelector((state) => state.app);
//   const course = data.course.course;
//   const [uploadedVideos, setUploadedVideos] = useState([]);

//   const handleClick = (id) => {
//     // Check if the video has already been uploaded
//     if (!uploadedVideos.includes(id)) {
//       // Simulate video upload
//       console.log(`Uploading video with id ${id}...`);
//       // Update uploadedVideos state to include the uploaded video id
//       setUploadedVideos([...uploadedVideos, id]);
//     }
//   };

//   const isVideoUploaded = (id) => {
//     return uploadedVideos.includes(id);
//   };

//   return (
//     <div className="container">
//       {/* Course Details */}
//       <div className="card mt-5 mb-4">
//         <h5 className="card-header">Course Details</h5>
//         <div className="card-body">
//           {<h5>{`Author: ${course.author_name}`}</h5>}
//           {<h5>{`Course: ${course.name}`}</h5>}
//           {<h5>{`Description: ${course.description}`}</h5>}
//         </div>
//       </div>

//       {/* Beginner module */}
//       <div className="card mt-5 mb-4">
//         <h5 className="card-header">Beginner module</h5>
//         <div className="card-body">
//           {course.sections.section1.map((item, index) => {
//             return (
//               <div className="card" key={item.id}>
//                 <div className="row">
//                   <div className="col-lg-10">
//                     <div className="card-body">
//                       <h5>{`${index + 1}. ${item.content}`}</h5>
//                     </div>
//                   </div>
//                   <div className="col-lg-2">
//                     <div className="card-body">
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() => handleClick(item.id)}
//                         disabled={isVideoUploaded(item.id)}
//                       >
//                         {isVideoUploaded(item.id) ? "Video Uploaded" : "Upload Video"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Intermediate Module */}

//       <div className="card mb-4">
//         <h5 className="card-header">Intermediate Module</h5>
//         <div className="card-body">
//           {course.sections.section2.map((item, index) => {
//             return (
//               <div className="card" key={item.id}>
//                 <div className="row">
//                   <div className="col-lg-10">
//                     <div className="card-body">
//                       <h5>{`${index + 1}. ${item.content}`}</h5>
//                     </div>
//                   </div>
//                   <div className="col-lg-2">
//                     <div className="card-body">
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() => handleClick(item.id)}
//                         disabled={isVideoUploaded(item.id)}
//                       >
//                         {isVideoUploaded(item.id) ? "Video Uploaded" : "Upload Video"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* advanced module */}

//       <div className="card">
//         <h5 className="card-header">Advanced module</h5>
//         <div className="card-body">
//           {course.sections.section3.map((item, index) => {
//             return (
//               <div className="card" key={item.id}>
//                 <div className="row">
//                   <div className="col-lg-10">
//                     <div className="card-body">
//                       <h5>{`${index + 1}. ${item.content}`}</h5>
//                     </div>
//                   </div>
//                   <div className="col-lg-2">
//                     <div className="card-body">
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() => handleClick(item.id)}
//                         disabled={isVideoUploaded(item.id)}
//                       >
//                         {isVideoUploaded(item.id) ? "Video Uploaded" : "Upload Video"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadVideo;
