import { render, screen } from "@testing-library/react";
import Game, { replaceUnderscoresWithCorrectGuess } from "../routes/game";

const input = {
  word: "test",
  maxGuesses: "5",
  maxTime: "60",
};

const initialUnderscores = input.word.replace(/[a-z]/gi, "_");

test("given an underscored word, it will replace ONLY correct guesses with the letter", () => {
  const displayedWordWithTs = replaceUnderscoresWithCorrectGuess({
    displayedWord: initialUnderscores,
    word2Guess: input.word,
    guessedLetter: "t",
  });

  const expected = "t__t";

  expect(displayedWordWithTs).toBe(expected);

  const displayedWordWithTsAfterWrongGuesses =
    replaceUnderscoresWithCorrectGuess({
      displayedWord: displayedWordWithTs,
      word2Guess: input.word,
      guessedLetter: "z",
    });

  expect(displayedWordWithTsAfterWrongGuesses).toBe(expected);
});

it("renders underscores for each letter in the word", () => {
  render(<Game gameSettings={input} />);

  expect(screen.getByText(initialUnderscores)).toBeInTheDocument();
});
