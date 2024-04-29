import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import userServices from "../services/userServices";
import { useLoaderData } from "react-router-dom";


export async function loader() {
    // get the currently logged in user
    const user = await userServices.getCurrentuser();

    // return the user data
    return { user };
}
function UploadForm() {
   const {user} = useLoaderData();
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const inputinterArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const inputadvanceArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [arr, setArr] = useState(inputArr);
  const [interarr, setinterArr] = useState(inputinterArr);
  const [advancearr, setadvanceArr] = useState(inputadvanceArr);
  const [title,settitle] = useState("")
  const [description ,setdescription] = useState("")

  const addInput = () => {
    setArr((s) => {
      console.log(s);
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const addInputinter = () => {
    setinterArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChangeinter = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setinterArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const addInputadvance = () => {
    setadvanceArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChangeadvance = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setadvanceArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    // const beginnerarr = arr.map((item) => {
    //   console.log(item.value);
    // });
    // const intermediatearr = arr.map((item) => {
    //   console.log(item.value);
    // });
    // const advancedarr = arr.map((item) => {
    //   console.log(item.value);
    // });
    
    let sections = {
        section1:[],
        section2:[],
        section3:[]
    }

    const section1_values = arr.map((items)=>{
        sections.section1.push({id:uuidv4(),content:items.value})
    })

    const section2_values = interarr.map((items)=>{
        sections.section2.push({id:uuidv4(),content:items.value})
    })
    const section3_values = advancearr.map((items)=>{
        sections.section3.push({id:uuidv4(),content:items.value})
    })

    console.log(sections)
    console.log(uuidv4())
    console.log(user)
    let course = {
        mentor_id:user.data.user._id,
        author_name:user.data.user.username,
        name:title,
        description:description,
        sections:sections
    }
    console.log(course)
  };
  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <div className="card mb-4">
            <div
              className="card-header"
              style={{ fontWeight: "bold", fontSize: 18 }}
            >
              Beginner Module
            </div>
            <div className="card-body">
              <div className="row mt-2">
                <div className="input-group input-group-lg">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    Title
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                      onChange={(e)=>{settitle(e.target.value)}}
                      value={title}
                    //   id={index}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="input-group input-group-lg">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                  Course Description
                  </span>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{height: 100}}
                      onChange={(e)=>{setdescription(e.target.value)}}
                      value={description}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Course Description</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* beginner card */}
          <div className="card mb-4">
            <div
              className="card-header"
              style={{ fontWeight: "bold", fontSize: 18 }}
            >
              Beginner Module
            </div>
            <div className="card-body">
              <div className="row">
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addInput}
                  >
                    Add Content
                  </button>
                </div>
              </div>

              {arr.map((item, index) => {
                return (
                  <div className="row mt-2" key={index}>
                    <div className="input-group input-group-lg">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        {`Content${index + 1}`}
                      </span>
                      <input
                        type={item.type}
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={handleChange}
                        value={item.value}
                        id={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* intermediate Card */}
          <div className="card mb-4">
            <div
              className="card-header"
              style={{ fontWeight: "bold", fontSize: 18 }}
            >
              Intermediate Module
            </div>
            <div className="card-body">
              <div className="row">
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addInputinter}
                  >
                    Add Content
                  </button>
                </div>
              </div>

              {interarr.map((item, index) => {
                return (
                  <div className="row mt-2" key={index}>
                    <div className="input-group input-group-lg">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        {`Content${index + 1}`}
                      </span>
                      <input
                        type={item.type}
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={handleChangeinter}
                        value={item.value}
                        id={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Advanced Card */}
          <div className="card mb-4">
            <div
              className="card-header"
              style={{ fontWeight: "bold", fontSize: 18 }}
            >
              Advanced Module
            </div>
            <div className="card-body">
              <div className="row">
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addInputadvance}
                  >
                    Add Content
                  </button>
                </div>
              </div>

              {advancearr.map((item, index) => {
                return (
                  <div className="row mt-2" key={index}>
                    <div className="input-group input-group-lg">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        {`Content${index + 1}`}
                      </span>
                      <input
                        type={item.type}
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={handleChangeadvance}
                        value={item.value}
                        id={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row">
            <div className="text-center">
            <button type="submit" className="btn btn-primary mb-4">
            Upload Videos
          </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadForm;

// import React, { useState } from "react";

// function UploadForm() {
//   const inputArr = [
//     {
//       type: "text",
//       id: 1,
//       value: "",
//       file: null,
//     },
//   ];
//   const inputinterArr = [
//     {
//       type: "text",
//       id: 1,
//       value: "",
//       file: null,
//     },
//   ];
//   const inputadvanceArr = [
//     {
//       type: "text",
//       id: 1,
//       value: "",
//       file: null,
//     },
//   ];
//   const [arr, setArr] = useState(inputArr);
//   const [interarr, setinterArr] = useState(inputinterArr);
//   const [advancearr, setadvanceArr] = useState(inputadvanceArr);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const addInput = (setArr) => {
//     setArr((s) => {
//       return [
//         ...s,
//         {
//           type: "text",
//           value: "",
//           file: null,
//         },
//       ];
//     });
//   };

//   const handleChange = (e, setArr) => {
//     e.preventDefault();

//     const index = e.target.id;
//     setArr((s) => {
//       const newArr = s.map((item, i) => {
//         if (i === parseInt(index)) {
//           return {
//             ...item,
//             value: e.target.value,
//           };
//         }
//         return item;
//       });

//       return newArr;
//     });
//   };

// //   const handleFileChange = (e, setArr) => {
// //     const index = e.target.id;
// //     const file = e.target.files[0];
// //     setArr((s) => {
// //       const newArr = s.map((item, i) => {
// //         if (i === parseInt(index)) {
// //           return {
// //             ...item,
// //             file: file,
// //           };
// //         }
// //         return item;
// //       });

// //       return newArr;
// //     });
// //   };

// const handleFileChange = (e, setArr) => {
//     const index = e.target.id;
//     const file = e.target.files[0];
//     setArr((s) => {
//       const newArr = s.map((item, i) => {
//         if (i === parseInt(index)) {
//           return {
//             ...item,
//             file: file,
//           };
//         }
//         return item;
//       });
  
//       return newArr;
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(title);
//     console.log(description);
//     console.log(arr);
//     console.log(interarr);
//     console.log(advancearr);
//   };

//   return (
//     <>
//       <div className="container mt-4">
//         <form onSubmit={handleSubmit}>
//           {/* Course Title */}
//           <div className="card mb-4">
//             <div
//               className="card-header"
//               style={{ fontWeight: "bold", fontSize: 18 }}
//             >
//               Beginner Module
//             </div>
//             <div className="card-body">
//               <div className="row mt-2">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text" id="inputGroup-sizing-lg">
//                     Title
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     aria-label="Sizing example input"
//                     aria-describedby="inputGroup-sizing-lg"
//                     onChange={(e) => setTitle(e.target.value)}
//                     value={title}
//                   />
//                 </div>
//               </div>

//               <div className="row mt-2">
//                 <div className="input-group input-group-lg">
//                   <span className="input-group-text" id="inputGroup-sizing-lg">
//                     Course Description
//                   </span>
//                   <div className="form-floating">
//                     <textarea
//                       className="form-control"
//                       placeholder="Leave a comment here"
//                       id="floatingTextarea2"
//                       style={{ height: 100 }}
//                       onChange={(e) => setDescription(e.target.value)}
//                       value={description}
//                     ></textarea>
//                     <label htmlFor="floatingTextarea2">Course Description</label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Beginner Card */}
//           <div className="card mb-4">
//             <div
//               className="card-header"
//               style={{ fontWeight: "bold", fontSize: 18 }}
//             >
//               Beginner Module
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="text-end">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => addInput(setArr)}
//                   >
//                     Add Content
//                   </button>
//                 </div>
//               </div>

//               {arr.map((item, index) => {
//                 return (
//                   <div className="row mt-2" key={index}>
//                     <div className="input-group input-group-lg">
//                       <span
//                         className="input-group-text"
//                         id="inputGroup-sizing-lg"
//                       >
//                         {`Content${index + 1}`}
//                       </span>
//                       <input
//                         type={item.type}
//                         className="form-control"
//                         aria-label="Sizing example input"
//                         aria-describedby="inputGroup-sizing-lg"
//                         onChange={(e) => handleChange(e, setArr)}
//                         value={item.value}
//                         id={index}
//                       />
//                       <input
//                         type="file"
//                         className="form-control"
//                         onChange={(e) => handleFileChange(e, setArr)}
//                         id={`file-${index}`}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Intermediate Card */}
//           <div className="card mb-4">
//             <div
//               className="card-header"
//               style={{ fontWeight: "bold", fontSize: 18 }}
//             >
//               Intermediate Module
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="text-end">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => addInput(setinterArr)}
//                   >
//                     Add Content
//                   </button>
//                 </div>
//               </div>

//               {interarr.map((item, index) => {
//                 return (
//                   <div className="row mt-2" key={index}>
//                     <div className="input-group input-group-lg">
//                       <span
//                         className="input-group-text"
//                         id="inputGroup-sizing-lg"
//                       >
//                         {`Content${index + 1}`}
//                       </span>
//                       <input
//                         type={item.type}
//                         className="form-control"
//                         aria-label="Sizing example input"
//                         aria-describedby="inputGroup-sizing-lg"
//                         onChange={(e) => handleChange(e, setinterArr)}
//                         value={item.value}
//                         id={index}
//                       />
//                       <input
//                         type="file"
//                         className="form-control"
//                         onChange={(e) => handleFileChange(e, setinterArr)}
//                         id={`file-${index}`}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Advanced Card */}
//           <div className="card mb-4">
//             <div
//               className="card-header"
//               style={{ fontWeight: "bold", fontSize: 18 }}
//             >
//               Advanced Module
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="text-end">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => addInput(setadvanceArr)}
//                   >
//                     Add Content
//                   </button>
//                 </div>
//               </div>

//               {advancearr.map((item, index) => {
//                 return (
//                   <div className="row mt-2" key={index}>
//                     <div className="input-group input-group-lg">
//                       <span
//                         className="input-group-text"
//                         id="inputGroup-sizing-lg"
//                       >
//                         {`Content${index + 1}`}
//                       </span>
//                       <input
//                         type={item.type}
//                         className="form-control"
//                         aria-label="Sizing example input"
//                         aria-describedby="inputGroup-sizing-lg"
//                         onChange={(e) => handleChange(e, setadvanceArr)}
//                         value={item.value}
//                         id={index}
//                       />
//                       <input
//                         type="file"
//                         className="form-control"
//                         onChange={(e) => handleFileChange(e, setadvanceArr)}
//                         id={`file-${index}`}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default UploadForm;
