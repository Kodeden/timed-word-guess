import PropTypes from "prop-types";
import useTimer from "../hooks/use-timer";

export default function Timer({ timeRemaining, setTimeRemaining }) {
  const { minutes, seconds, tenths } = useTimer(
    timeRemaining,
    setTimeRemaining
  );

  return (
    <p data-testid="timer-display">
      {minutes}:{seconds.toString().padStart(2, "0")}.{tenths}
      ⏱️
    </p>
  );
}

Timer.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  setTimeRemaining: PropTypes.func.isRequired,
};
