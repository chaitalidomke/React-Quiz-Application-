import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    correctAnswer: 1
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correctAnswer: 3
  },
  {
    question: "Which hook is used for state in React?",
    options: ["useEffect", "useState", "useRef", "useContext"],
    correctAnswer: 1
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    correctAnswer: 2
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h1> Quiz Application</h1>

      {!showResult && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          ></div>
        </div>
      )}

      {showResult ? (
        <div className="result">
          <h2>🎉 Quiz Completed!</h2>
          <p>
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-box">
          <h3>
            Question {currentQuestion + 1} of {questions.length}
          </h3>

          <p className="question-text">
            {questions[currentQuestion].question}
          </p>

          {questions[currentQuestion].options.map((option, index) => {
            let optionClass = "option";

            if (selectedOption !== null) {
              if (index === questions[currentQuestion].correctAnswer) {
                optionClass += " correct";
              } else if (index === selectedOption) {
                optionClass += " wrong";
              }
            } else if (index === selectedOption) {
              optionClass += " selected";
            }

            return (
              <label key={index} className={optionClass}>
                <input
                  type="radio"
                  name="option"
                  disabled={selectedOption !== null}
                  onChange={() => setSelectedOption(index)}
                />
                {option}
              </label>
            );
          })}

          <button
            className="next-btn"
            disabled={selectedOption === null}
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
