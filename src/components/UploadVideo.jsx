import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import courseServices from "../services/courseServices";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import userServices from "../services/userServices";
import { setcourse } from "../../reducers/courseSlice";

// export async function loader() {
//   // get the currently logged in user
//   const{id} = useParams();

//   try {
//     const current_course = await courseServices.getCoursebyId({course_id:id}).data
//     console.log(current_course)
//     return {current_course}
//   } catch (error) {
//     console.log(error)
//   }
// //   try {
// //     // const course = await courseServices.getCoursebyId({course_id:id})
// //     console.log("GetV")
// //     courseServices
// //       .getCoursebyId({ course_id: id })
// //       .then((response) => {
// //         console.log("asdasdasdsadsada")
// //         const course = response.data.course
// //         console.log(course)
// //         // setcourse(course)
// //         // setsections(course.sections)
// //       })
// //       .catch((error) => {

// //         console.log(error.response.data.message);
// //       });
// //   } catch (error) {
// // console.log(error)
// //   }

//   // return the user data
//   // return { user };
// }
function UploadVideo() {
  const data = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadedVideos, setUploadedVideos] = useState({});
  // console.log(data)
  const course = data?.course;
  const { id } = useParams();
  // console.log(id)
  // console.log(data.course)
  // console.log(course);
  console.log(selectedFiles);

  // console.log(course.sections[0].section1);
  // console.log(course.sections[0].section2);

  // console.log(course.sections[0].section3);

  // const handleClick = (id) => {
  //   console.log(id);
  //   courseServices.uploadvideo({video_id:id,course_id:course._id}).then((res)=>{
  //       console.log(res.data.message)
  //   }).catch((error)=>{
  //       console.log(error.response.data.message)
  //   })
  // };

  // const handlefilechange = (e) => {
  //   console.log(e.target.files)
  //   setSelectedFile(e.target.files);
  //   console.log(selectedFile)
  // };
  const nextpage = ()=>{
    navigate(`/quizupload/${id}`)
  }
  const handleFileChange = (e, sectionId) => {
    console.log(sectionId);
    setSelectedFiles({
      ...selectedFiles,
      [sectionId]: e.target.files[0],
    });
  };
  const handleClick = async (sectionId) => {
    const file = selectedFiles[sectionId];
    if (!file) {
      alert("Choose file");
    } else {
      try {
        const formData = new FormData();
        console.log(file.name);
        formData.append("video", file);
        formData.append("video_id", sectionId);
        formData.append("course_id", course._id);
        console.log(formData.get("video"));

        const response = await courseServices.uploadvideo(formData);
        setUploadedVideos({
          ...uploadedVideos,
          [sectionId]: true, // Mark section as uploaded
        });
        console.log(response.data.message);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    console.log("effect");
    const fetchData = async () => {
      console.log("fetchdata");
      console.log(data.course);
      if (Object.keys(data.course).length == 0) {
        console.log("course");
        try {
          // Fetch course data or perform any async operation
          // console.log("effect")
          setloading(true);
          const response = await courseServices.getCoursebyId({
            course_id: id,
          });
          const currentCourse = response.data.course;
          dispatch(setcourse(currentCourse));
          // console.log(currentCourse);
          setloading(false);
          // Update state or do something with the data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setloading(false);
      }
    };

    fetchData();
  }, [data.course, id]);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="container">
          {/* Course Details */}
          <div className="card mt-5 mb-4">
            <h5 className="card-header">Course Details</h5>
            <div className="card-body">
              {<h5>{`Author: ${course?.author_name}`}</h5>}
              {<h5>{`Course: ${course?.name}`}</h5>}
              {<h5>{`Description: ${course?.description}`}</h5>}
            </div>
          </div>

          {/* Beginner module */}
          <div className="card mt-5 mb-4">
            <h5 className="card-header">Beginner module</h5>
            <div className="card-body">
              {course?.sections[0]?.sectionContent.map((item, index) => {
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
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => {
                              console.log(item);
                              handleFileChange(e, item.id);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="card-body">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            // onClick={() => handleClick(item.id)}
                            onClick={() => handleClick(item.id)}
                            disabled={uploadedVideos[item.id]}
                          >
                            {uploadedVideos[item.id]
                              ? "Video Uploaded"
                              : "Upload Video"}
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
              {course?.sections[1]?.sectionContent.map((item, index) => {
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
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => handleFileChange(e, item.id)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-2">
                        <div className="card-body">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleClick(item.id)}
                            disabled={uploadedVideos[item.id]}
                          >
                            {uploadedVideos[item.id]
                              ? "Video Uploaded"
                              : "Upload Video"}
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
              {course?.sections[2]?.sectionContent.map((item, index) => {
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
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => handleFileChange(e, item.id)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-2">
                        <div className="card-body">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleClick(item.id)}
                            disabled={uploadedVideos[item.id]}
                          >
                            {uploadedVideos[item.id]
                              ? "Video Uploaded"
                              : "Upload Video"}
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
      )}

      <div className="row mt-4">
        <div className="text-center">
          <button type="button" className="btn btn-primary mb-4" onClick={()=>{nextpage()}}>
            Next
          </button>
        </div>
      </div>
    </>
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
