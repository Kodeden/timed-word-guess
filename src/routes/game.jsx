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

const replaceUnderscoresWithCorrectGuess = (word, guess) => {
  return word.split
    .map((letter, index) => {
      if (word[index].toLowerCase() === guess.toLowerCase()) {
        return word[index];
      }
      return letter;
    })
    .join("");
};

// TODO: Add timer ⏱️
export default function Game({ gameSettings }) {
  const { word, maxGuesses, maxTime } = gameSettings;

  React.useEffect(() => {
    mainRef.current.focus();
  }, []);

  const mainRef = React.useRef(null);

  const [wordDisplay, setWordDisplay] = React.useState(
    word.replace(/[a-z]/gi, "_")
  );
  const [rongGuesses, setRongGuesses] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState("playing");

  const handleGuess = (e) => {
    const guess = e.target.value;

    if (word.includes(guess)) {
      setWordDisplay((prev) => replaceUnderscoresWithCorrectGuess(prev, guess));
    } else {
      setRongGuesses((prev) => prev + 1);
    }

    setGameStatus(
      getGameStatus({
        displayedWord: wordDisplay,
        badGuesses: rongGuesses,
        maxBadGuesses: maxGuesses,
      })
    );
  };

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
