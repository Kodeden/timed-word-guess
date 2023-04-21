import PropTypes from "prop-types";
import GameOver from "../components/game-over";
import Timer from "../components/timer";
import useGame from "../hooks/use-game";

export default function Game({ gameSettings }) {
  const {
    gameStatus,
    wordDisplay,

    // ⚠️ We need to pass these down to the Timer component.
    // `useGame` uses the time information ℹ️ differently from `useTimer`.
    timeRemaining,
    setTimeRemaining,
    handleGuess,
    hiddenInputRef,
  } = useGame({ gameSettings });

  return gameStatus === "playing" ? (
    <main className="flex h-screen flex-col items-center justify-center gap-y-8 outline-none">
      <h1 className="text-4xl font-black">Guess the Word</h1>

      <Timer
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
      />

      <p className="text-4xl font-extrabold uppercase tracking-widest">
        {wordDisplay}
      </p>

      {/* Add a hidden input element */}
      <input
        ref={hiddenInputRef}
        onKeyDown={handleGuess}
        // ⚠️ Don't use 'hidden' or 'invisible' b/c we can't focus 🔍. (same with 'type="hidden"')
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
    </main>
  ) : (
    <GameOver status={gameStatus} />
  );
}

Game.propTypes = {
  gameSettings: PropTypes.exact({
    word: PropTypes.string.isRequired,

    // Stupid HTML forms have values as strings
    maxGuesses: PropTypes.string.isRequired,
    maxTime: PropTypes.string.isRequired,
  }),
};
