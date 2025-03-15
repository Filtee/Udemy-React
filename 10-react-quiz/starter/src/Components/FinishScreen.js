function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  switch (true) {
    case percentage === 100:
      emoji = "🥇";
      break;

    case percentage > 0 && percentage < 100:
      emoji = "🎉";
      break;

    case percentage === 0:
      emoji = "🤦‍♂️";
      break;

    default:
      emoji = "❓";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints}! ({percentage}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
