import React, { useState } from "react";
import courseServices from "../services/courseServices";

function Quizmodal({ modalclose, contentid,section,fetchdata }) {
  const [showmodal, setshowmodal] = useState(true);
  const [questions, setQuestions] = useState([
    { id: 1, question: "", options: ["", "", ""], answer: "" },
  ]);
  const [quizsuccess, setquizsuccess] = useState(false);
  const [quizfooter, setquizfooter] = useState(true);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: "",
      options: ["", "", ""],
      answer: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = value;
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionId, value) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, answer: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionId, value) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, question: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizData = questions.map(({ question, options, answer }) => ({
      question,
      options,
      correctAnswer: answer,
    }));
    console.log(quizData);
    // Do whatever you want with quizData, like sending it to a server
    try {
      const quiz = await courseServices.createQuiz({
        content_id: contentid,
        quiz: quizData,
        section:section
      });
      console.log(quiz.data);
      setquizsuccess(true);
      setquizfooter(false)
      fetchdata()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <h6>{section}</h6>
      <form onSubmit={handleSubmit}>
        <div
          className={showmodal ? "modal fade show" : "modal fade"}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: showmodal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Quiz
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setshowmodal(false);
                    modalclose(false);
                  }}
                ></button>
              </div>

              {quizsuccess ?<div className="text-center mb-5 mt-4" style={{fontSize:22,color:"#0d6efd"}}>
                Quiz Created Successfully!
                </div>:
              (<div className="modal-body">
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addQuestion}
                  >
                    Add Question
                  </button>
                </div>
                {questions.map((question) => (
                  <div
                    key={question.id}
                    style={{ fontFamily: "sans-serif", fontSize: 14 }}
                  >
                    <div className="">
                      <label
                        htmlFor={`question-${question.id}`}
                        className="form-label"
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "#0d6efd",
                        }}
                      >
                        {`Question${question.id}`}
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id={`question-${question.id}`}
                        name="question"
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(question.id, e.target.value)
                        }
                      />
                    </div>

                    {question.options.map((option, index) => (
                      <div className="" key={index}>
                        <label
                          htmlFor={`option-${question.id}-${index + 1}`}
                          className="form-label"
                          style={{ fontWeight: "bold", color: "grey" }}
                        >
                          Option{index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`option-${question.id}-${index + 1}`}
                          name={`option${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              question.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}

                    <div className="">
                      <label
                        htmlFor={`answer-${question.id}`}
                        className="form-label"
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "green",
                        }}
                      >
                        Answer
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`answer-${question.id}`}
                        name="answer"
                        value={question.answer}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                      />
                    </div>
                    <hr />
                  </div>
                ))}
              </div>)}
              {quizfooter&&(<div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setshowmodal(false);
                    modalclose(false);
                  }}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Quizmodal;









// import React, { useState } from "react";

// function Quizmodal({ modalclose, contentid }) {
//   const [showmodal, setshowmodal] = useState(true);
//   const [questions, setQuestions] = useState([
//     { id: 1, options: ["", "", ""], answer: "" },
//   ]);

//   const addQuestion = () => {
//     const newQuestion = {
//       id: questions.length + 1,
//       options: ["", "", ""],
//       answer: "",
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const handleOptionChange = (questionId, optionIndex, value) => {
//     const updatedQuestions = questions.map((question) => {
//       if (question.id === questionId) {
//         const updatedOptions = [...question.options];
//         updatedOptions[optionIndex] = value;
//         return { ...question, options: updatedOptions };
//       }
//       return question;
//     });
//     setQuestions(updatedQuestions);
//   };

//   const handleAnswerChange = (questionId, value) => {
//     const updatedQuestions = questions.map((question) => {
//       if (question.id === questionId) {
//         return { ...question, answer: value };
//       }
//       return question;
//     });
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const quizData = questions.map(({ question, options, correctAnswer }) => ({
//       question,
//       options,
//       correctAnswer,
//     }));
//     console.log(quizData);
//     // Do whatever you want with quizData, like sending it to a server
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div
//           className={showmodal ? "modal fade show" : "modal fade"}
//           id="exampleModal"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//           style={{ display: showmodal ? "block" : "none" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <h6>{contentid}</h6>
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   Edit Changes
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   onClick={addQuestion}
//                 >
//                   Add Question
//                 </button>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => {
//                     setshowmodal(false);
//                     modalclose(false);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {questions.map((question) => (
//                   <div
//                     key={question.id}
//                     style={{ fontFamily: "sans-serif", fontSize: 14 }}
//                   >
//                     <div className="">
//                       <label
//                         htmlFor={`question-${question.id}`}
//                         className="form-label"
//                         style={{ fontWeight: "bold", fontSize: 20 }}
//                       >
//                         Question
//                       </label>
//                       <textarea
//                         type="text"
//                         className="form-control"
//                         id={`question-${question.id}`}
//                         name="question"
//                       />
//                     </div>

//                     {question.options.map((option, index) => (
//                       <div className="" key={index}>
//                         <label
//                           htmlFor={`option-${question.id}-${index + 1}`}
//                           className="form-label"
//                           style={{ fontWeight: "bold" }}
//                         >
//                           Option{index + 1}
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id={`option-${question.id}-${index + 1}`}
//                           name={`option${index + 1}`}
//                           value={option}
//                           onChange={(e) =>
//                             handleOptionChange(
//                               question.id,
//                               index,
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     ))}

//                     <div className="">
//                       <label
//                         htmlFor={`answer-${question.id}`}
//                         className="form-label"
//                         style={{ fontWeight: "bold", fontSize: 20 }}
//                       >
//                         Answer
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`answer-${question.id}`}
//                         name="answer"
//                         value={question.answer}
//                         onChange={(e) =>
//                           handleAnswerChange(question.id, e.target.value)
//                         }
//                       />
//                     </div>
//                     <hr />
//                   </div>
//                 ))}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                   onClick={() => {
//                     setshowmodal(false);
//                     modalclose(false);
//                   }}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   onClick={() => {}}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// export default Quizmodal;

// import React, { useState } from 'react'

// function Quizmodal({modalclose ,contentid}) {
//     const [showmodal, setshowmodal] = useState(true);
//   return (
//     <>

//       <form>
//         <div
//           className={showmodal ? "modal fade show" : "modal fade"}
//           id="exampleModal"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//           style={{ display: showmodal ? "block" : "none" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//                 <h6>{contentid}</h6>
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   Edit Changes
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => {
//                     setshowmodal(false);
//                     modalclose(false);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div style={{ fontFamily: "sans-serif", fontSize: 14 }}>
//                   <div className="">
//                     <label
//                       htmlFor="exampleInputPassword1"
//                       className="form-label"
//                       style={{fontWeight:'bold',fontSize:20}}
//                     >
//                       Question
//                     </label>
//                     <textarea
//                       type="text"
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       name="name"
//                     />
//                   </div>

//                   {/* {formik.getFieldMeta("name").error &&
//                     formik.getFieldMeta("name").touched && (
//                       <span style={{ color: "red" }}>
//                         {formik.getFieldMeta("name").error}
//                       </span>
//                     )} */}

//                   <div className="">
//                     <label htmlFor="exampleInputEmail1" className="form-label" style={{fontWeight:'bold'}}>
//                       Option1
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       aria-describedby="emailHelp"
//                       name="option1"
//                     //   onChange={formik.handleChange}
//                     //   value={formik.values.birthdate}
//                     />
//                   </div>

//                   {/* {formik.getFieldMeta("birthdate").error &&
//                     formik.getFieldMeta("birthdate").touched && (
//                       <span style={{ color: "red" }}>
//                         {formik.getFieldMeta("birthdate").error}
//                       </span> */}
//                     {/* )} */}

//                   <div className="">
//                     <label
//                       htmlFor="exampleInputPassword1"
//                       className="form-label"
//                       style={{fontWeight:'bold'}}
//                     >
//                       Option2
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       name="option2"
//                     //   onChange={formik.handleChange}
//                     //   value={formik.values.biography}
//                     />
//                   </div>

//                   {/* {formik.getFieldMeta("biography").error &&
//                     formik.getFieldMeta("biography").touched && (
//                       <span style={{ color: "red" }}>
//                         {formik.getFieldMeta("biography").error}
//                       </span>
//                     )} */}
//                     <div className="">
//                     <label
//                       htmlFor="exampleInputPassword1"
//                       className="form-label"
//                       style={{fontWeight:'bold'}}
//                     >
//                       Option3
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       name="option3"
//                     //   onChange={formik.handleChange}
//                     //   value={formik.values.biography}
//                     />
//                   </div>

//                   <div className="">
//                     <label
//                       htmlFor="exampleInputPassword1"
//                       className="form-label"
//                       style={{fontWeight:'bold',fontSize:20}}
//                     >
//                       Answer
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       name="answer"
//                     //   onChange={formik.handleChange}
//                     //   value={formik.values.biography}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                   onClick={() => {
//                     setshowmodal(false);
//                     modalclose(false);
//                   }}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                 //   style={{ backgroundColor: "#20236D", border: "none" }}
//                   onClick={() => {}}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   )
// }

// export default Quizmodal
