import React from "react";

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

export default function useGame({ gameSettings }) {
  const { word, maxGuesses, maxTime } = gameSettings;

  const [wordDisplay, setWordDisplay] = React.useState(
    word.replace(/[a-z]/gi, "_")
  );
  const [rongGuesses, setRongGuesses] = React.useState(0);

  // 'timeRemaining' needs to be here in the parent b/c of the game logic ☝️.
  const [timeRemaining, setTimeRemaining] = React.useState(
    Number(maxTime) *
      // Multiplying by 600 so we can split this time in the Timer component.
      600
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

  return {
    gameStatus,
    wordDisplay,
    timeRemaining,
    setTimeRemaining,
    handleGuess,
    hiddenInputRef,
  };
}
