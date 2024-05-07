import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
const quizData = [
  {
      "question": "what is the correct syntax for body tag opening?",
      "options": [
          "body",
          "<body>",
          "<body/>"
      ],
      "correctAnswer": "<body>"
  },
  {
      "question": "what is the correct syntax for input tag opening?",
      "options": [
          "input ",
          "<input>",
          "<input/>"
      ],
      "correctAnswer": "<input>"
  }
]
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswerOptionClick = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextButtonClick = () => {
    handleAnswerOptionClick();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousButtonClick = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
      setSelectedOption(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          {showScore ? (
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Quiz Completed!</h5>
                <p className="card-text">
                  You scored {score} out of {quizData.length}.
                </p>
                <button className="btn btn-primary" onClick={resetQuiz}>
                  Restart Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header">
                Question {currentQuestion + 1}/{quizData.length}
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {quizData[currentQuestion].question}
                </h5>
                <div>
                  {quizData[currentQuestion].options.map((option, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`option${index}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                      />
                      <label className="form-check-label" htmlFor={`option${index}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handlePreviousButtonClick}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;





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
