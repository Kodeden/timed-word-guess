import PropTypes from "prop-types";
import React from "react";
import GameOver from "../components/game-over";
import Timer from "../components/timer";

const getGameStatus = ({
  displayedWord,
  badGuesses,
  maxBadGuesses,
  timeRemaining,
}) => {
  if (!displayedWord.includes("_")) {
    return "won";
  }

  if (badGuesses >= maxBadGuesses || timeRemaining <= 0) {
    return "lost";
  }

  return "playing";
};

export const replaceUnderscoresWithCorrectGuess = ({
  displayedWord,
  word2Guess,
  guessedLetter,
}) => {
  return displayedWord
    .split("")
    .map((letterOrUnderscore, index) => {
      if (word2Guess[index].toLowerCase() === guessedLetter.toLowerCase()) {
        return word2Guess[index];
      }

      return letterOrUnderscore;
    })
    .join("");
};

export default function Game({ gameSettings }) {
  const { word, maxGuesses, maxTime } = gameSettings;

  const [wordDisplay, setWordDisplay] = React.useState(
    word.replace(/[a-z]/gi, "_")
  );
  const [rongGuesses, setRongGuesses] = React.useState(0);
  const [timeRemaining, setTimeRemaining] = React.useState(
    Number(gameSettings.maxTime) * 600
  );

  React.useEffect(() => {
    hiddenInputRef.current.focus();
  }, []);

  const hiddenInputRef = React.useRef(null);

  const handleGuess = (e) => {
    const guess = e.key;

    // Check if the pressed key is a letter (case-insensitive)
    if (!/^[a-zA-Z]$/.test(guess)) {
      return; // Ignore non-letter keys
    }

    if (word.includes(guess)) {
      setWordDisplay((prev) =>
        replaceUnderscoresWithCorrectGuess({
          displayedWord: prev,
          word2Guess: word,
          guessedLetter: guess,
        })
      );
    } else {
      setRongGuesses((prev) => prev + 1);
    }
  };

  // No need for state here. It's a 'computed' value based on other state.
  const gameStatus = getGameStatus({
    displayedWord: wordDisplay,
    badGuesses: rongGuesses,
    maxBadGuesses: maxGuesses,
    timeRemaining,
  });

  return gameStatus === "playing" ? (
    <main className="flex h-screen flex-col items-center justify-center gap-y-8 outline-none">
      <h1 className="text-4xl font-black">Guess the Word</h1>

      <Timer
        startingTimeInMinutes={Number(maxTime)}
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
