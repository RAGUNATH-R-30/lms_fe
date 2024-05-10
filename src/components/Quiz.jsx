import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import courseServices from "../services/courseServices";
import userServices from "../services/userServices";
import { ToastManager, showToast } from "./ToastManager";


const Quiz = () => {
  const {id} =  useParams();
  const location = useLocation();
  const { item ,section ,course_id  } = location.state;
  const [quizData,setQuizdata] = useState([])
  const [user_id,setuser_id] = useState("")
  const navigate = useNavigate();
  console.log(user_id)
  console.log(item)
  console.log(section)
  // console.log(index)
  // console.log(location)
  // console.log(item)
  // console.log(something)
  // console.log(location.state.dummy)
  // const data = location.state.item
  // console.log(location)
  // const{dummy} = location.state;
  // console.log(dummy)
//   const quizData = [
//   {
//       "question": "what is the correct syntax for body tag opening?",
//       "options": [
//           "body",
//           "<body>",
//           "<body/>"
//       ],
//       "correctAnswer": "<body>"
//   },
//   {
//       "question": "what is the correct syntax for input tag opening?",
//       "options": [
//           "input ",
//           "<input>",
//           "<input/>"
//       ],
//       "correctAnswer": "<input>"
//   }
// ]
  const [answers, setAnswers] = useState(Array(quizData.length).fill('')); // Store selected answers
  const [showResult, setShowResult] = useState(false);

  const handleAnswerChange = (index, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmit = async() => {
    try {
      const score = answers.filter(
        (answer, index) => answer === quizData[index].correctAnswer
      ).length;
      console.log(score)
  
      if(score == quizData.length){
  
        if (section=="Section 1"){
          console.log(user_id,item.id,course_id)
          const quizAnswerupdate = await courseServices.updateQuizanswer({user_id:user_id,course_id:course_id,quiz_id:item.id,section:"Section 1"})
          showToast("Answered")
          setTimeout(()=>{
            navigate(-1)
          },700)
    
          
          console.log(quizAnswerupdate)
        }
        if (section=="Section 2"){
          const quizAnswerupdate = await courseServices.updateQuizanswer({user_id:user_id,course_id:course_id,quiz_id:item.id,section:"Section 2"})
          showToast("Answered")
          setTimeout(()=>{
            navigate(-1)
          },700)
          console.log(quizAnswerupdate)
  
        }
        if (section=="Section 3"){
          const quizAnswerupdate = await courseServices.updateQuizanswer({user_id:user_id,course_id:course_id,quiz_id:item.id,section:"Section 3"})
          showToast("Answered")
          setTimeout(()=>{
            navigate(-1)
          },700)

          console.log(quizAnswerupdate)
  
        }
        
      }
      else{
        setShowResult(true);
      }
    } catch (error) {
      console.log(error)
    }
    
    
    // You can add more sophisticated scoring logic here if needed
  };

  const resetQuiz = () => {
    setAnswers(Array(quizData.length).fill(''));
    setShowResult(false);
  };

const getQuiz= async(id)=>{
const quiz = await courseServices.getQuiz({id:id})
setQuizdata(quiz.data.quiz.quiz)
console.log(quiz)
}
const getuser=async()=> {
  // get the currently logged in user
  const user = await userServices.getCurrentuser();
  console.log(user.data.user._id)
  setuser_id(user.data.user._id)
  // console.log(user);
  // return the user data
}
  useEffect(()=>{
    getQuiz(id),
    getuser()
  },[user_id])
  return (
    <>
    <ToastManager></ToastManager>
    <div className="container">
      {/* {id} */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              {showResult ? 'Quiz Result' : 'Quiz Questions'}
            </div>
            <div className="card-body">
              {showResult ? (
                <div>
                  {quizData.map((question, index) => (
                    <div key={index} className="mb-3">
                      <h5>{question.question}</h5>
                      <p>Your answer: {answers[index]}</p>
                      <p>Correct answer: {question.correctAnswer}</p>
                    </div>
                  ))}
                  <p>
                    Total Score: {answers.filter((answer, index) => answer === quizData[index].correctAnswer).length} / {quizData.length}
                  </p>
                  <button className="btn btn-primary mr-2" onClick={resetQuiz}>
                    Restart Quiz
                  </button>
                </div>
              ) : (
                <div>
                  {quizData.map((question, index) => (
                    <div key={index} className="mb-3">
                      <h5>{question.question}</h5>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id={`question${index}_option${optionIndex}`}
                            value={option}
                            checked={answers[index] === option}
                            onChange={() => handleAnswerChange(index, option)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`question${index}_option${optionIndex}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Quiz;

// const quizData = [
//   {
//     question: "What is the capital of France?",
//     options: ["London", "Paris", "Berlin", "Madrid"],
//     correctAnswer: "Paris",
//   },
//   {
//     question: "What is 2 + 2?",
//     options: ["3", "4", "5", "6"],
//     correctAnswer: "4",
//   },
//   {
//     question: "What is 2 + 2?",
//     options: ["3", "4", "5", "6"],
//     correctAnswer: "4",
//   },
//   // Add more questions as needed
// ];
// const quizData = [
//   {
//       "question": "what is the correct syntax for body tag opening?",
//       "options": [
//           "body",
//           "<body>",
//           "<body/>"
//       ],
//       "correctAnswer": "<body>"
//   },
//   {
//       "question": "what is the correct syntax for input tag opening?",
//       "options": [
//           "input ",
//           "<input>",
//           "<input/>"
//       ],
//       "correctAnswer": "<input>"
//   }
// ]
// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleAnswerOptionClick = () => {
//     if (selectedOption === quizData[currentQuestion].correctAnswer) {
//       setScore(score + 1);
//     }
//   };

//   const handleNextButtonClick = () => {
//     handleAnswerOptionClick();
//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < quizData.length) {
//       setCurrentQuestion(nextQuestion);
//       setSelectedOption(null);
//     } else {
//       setShowScore(true);
//     }
//   };

//   const handlePreviousButtonClick = () => {
//     const previousQuestion = currentQuestion - 1;
//     if (previousQuestion >= 0) {
//       setCurrentQuestion(previousQuestion);
//       setSelectedOption(null);
//     }
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowScore(false);
//     setSelectedOption(null);
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-8">
//           {showScore ? (
//             <div className="card text-center">
//               <div className="card-body">
//                 <h5 className="card-title">Quiz Completed!</h5>
//                 <p className="card-text">
//                   You scored {score} out of {quizData.length}.
//                 </p>
//                 <button className="btn btn-primary" onClick={resetQuiz}>
//                   Restart Quiz
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="card">
//               <div className="card-header">
//                 Question {currentQuestion + 1}/{quizData.length}
//               </div>
//               <div className="card-body">
//                 <h5 className="card-title">
//                   {quizData[currentQuestion].question}
//                 </h5>
//                 <div>
//                   {quizData[currentQuestion].options.map((option, index) => (
//                     <div key={index} className="form-check">
//                       <input
//                         type="radio"
//                         className="form-check-input"
//                         id={`option${index}`}
//                         value={option}
//                         checked={selectedOption === option}
//                         onChange={() => setSelectedOption(option)}
//                       />
//                       <label className="form-check-label" htmlFor={`option${index}`}>
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-3">
//                   <button
//                     className="btn btn-primary mr-2"
//                     onClick={handlePreviousButtonClick}
//                     disabled={currentQuestion === 0}
//                   >
//                     Previous
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleNextButtonClick}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;





// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Quiz data - you can replace this with your own quiz questions
// const quizData = [
//   {
//     question: "What is the capital of France?",
//     options: ["London", "Paris", "Berlin", "Madrid"],
//     correctAnswer: "Paris",
//   },
//   {
//     question: "What is 2 + 2?",
//     options: ["3", "4", "5", "6"],
//     correctAnswer: "4",
//   },
//   {
//     question: "What is 2 + 2?",
//     options: ["3", "4", "5", "6"],
//     correctAnswer: "4",
//   },
//   // Add more questions as needed
// ];

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);

//   const handleAnswerOptionClick = (selectedAnswer) => {
//     if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
//       setScore(score + 1);
//     }

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < quizData.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//     }
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowScore(false);
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-8">
//           {showScore ? (
//             <div className="card text-center">
//               <div className="card-body">
//                 <h5 className="card-title">Quiz Completed!</h5>
//                 <p className="card-text">
//                   You scored {score} out of {quizData.length}.
//                 </p>
//                 <button className="btn btn-primary" onClick={resetQuiz}>
//                   Restart Quiz
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="card">
//               <div className="card-header">
//                 Question {currentQuestion + 1}/{quizData.length}
//               </div>
//               <div className="card-body">
//                 <h5 className="card-title">
//                   {quizData[currentQuestion].question}
//                 </h5>
//                 <div className="btn-group-vertical">
//                   {quizData[currentQuestion].options.map((option, index) => (
//                     <button
//                       key={index}
//                       className="btn btn-outline-primary"
//                       onClick={() => handleAnswerOptionClick(option)}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
