import PropTypes from "prop-types";
import React from "react";
import GameOver from "../components/game-over";

const getGameStatus = ({ displayedWord, badGuesses, maxBadGuesses }) => {
  if (!displayedWord.includes("_")) {
    return "won";
  }

  if (badGuesses >= maxBadGuesses) {
    return "lost";
  }

  return "playing";
};

const replaceUnderscoresWithCorrectGuess = ({
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

// TODO: Add timer ⏱️
export default function Game({ gameSettings }) {
  const { word, maxGuesses, maxTime } = gameSettings;

  const [wordDisplay, setWordDisplay] = React.useState(
    word.replace(/[a-z]/gi, "_")
  );
  const [rongGuesses, setRongGuesses] = React.useState(0);

  React.useEffect(() => {
    mainRef.current.focus();
  }, []);

  const mainRef = React.useRef(null);

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
  });

  return gameStatus === "playing" ? (
    <main
      className="flex h-screen flex-col items-center justify-center gap-y-8 outline-none"
      onKeyDown={handleGuess}
      tabIndex={0}
      ref={mainRef}
    >
      <h1 className="text-4xl font-black">Guess the Word</h1>

      <p className="text-4xl font-extrabold uppercase tracking-widest">
        {wordDisplay}
      </p>
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
