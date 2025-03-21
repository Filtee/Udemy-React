import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { questions, answer, index, dispatch } = useQuiz();
  const numQuestions = questions.length;

  if (answer === null) return null;

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
}

export default NextButton;
