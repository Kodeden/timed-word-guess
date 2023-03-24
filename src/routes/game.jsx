import PropTypes from "prop-types";
import { useState } from "react";
import GameOver from "../components/GameOver";

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

function Game({ word, maxRongGuesses }) {
  const [wordDisplay, setWordDisplay] = useState(word.replace(/[a-z]/gi, "_"));
  const [rongGuesses, setRongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState(true);

  const handleGuess = (e) => {
    const guess = e.target.value;

    if (word.includes(guess)) {
      setWordDisplay((prev) => replaceUnderscoresWithCorrectGuess(prev, guess));
    } else {
      setRongGuesses((prev) => prev + 1);
    }

    setGameStatus(
      getGameStatus({ displayedWord: wordDisplay, rongGuesses, maxRongGuesses })
    );
  };

  return gameStatus === "playing" ? (
    <main className="flex h-screen flex-col items-center justify-center gap-y-8">
      <h1 className="text-4xl font-black">Guess the Word</h1>

      <p className="text-8xl font-extrabold uppercase tracking-widest">
        {wordDisplay}
      </p>

      <div className="flex gap-x-2">
        <label htmlFor="guess">Guess a letter:</label>
        <input
          type="text"
          className="w-8 border-2 border-gray-300"
          maxLength={1}
          id="guess"
          onChange={handleGuess}
        />
      </div>
    </main>
  ) : (
    <GameOver status={gameStatus} />
  );
}

Game.defaultProps = {
  maxRongGuesses: null,
};

Game.propTypes = {
  word: PropTypes.string.isRequired,
  maxRongGuesses: PropTypes.number,
};
