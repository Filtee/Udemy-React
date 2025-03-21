import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { answer, dispatch } = useQuiz();

  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? "answer" : ""} ${
            hasAnswer
              ? idx === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
