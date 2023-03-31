import { render, screen } from "@testing-library/react";
import Game, { replaceUnderscoresWithCorrectGuess } from "../routes/game";
import { setup } from "./utils";

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

it("reveals the letter when the user guesses correctly", async () => {
  const firstGuess = "t";
  const { user } = setup(<Game gameSettings={input} />);

  await user.keyboard(firstGuess);

  const updatedDisplayedWord = replaceUnderscoresWithCorrectGuess({
    displayedWord: initialUnderscores,
    word2Guess: input.word,
    guessedLetter: firstGuess,
  });

  expect(screen.getByText(updatedDisplayedWord)).toBeInTheDocument();

  const secondGuess = "e";
  await user.keyboard(secondGuess);

  const updatedDisplayedWord2 = replaceUnderscoresWithCorrectGuess({
    displayedWord: updatedDisplayedWord,
    word2Guess: input.word,
    guessedLetter: secondGuess,
  });

  expect(screen.getByText(updatedDisplayedWord2)).toBeInTheDocument();

  const badGuess = "z";

  await user.keyboard(badGuess);

  const updatedDisplayedWord3 = replaceUnderscoresWithCorrectGuess({
    displayedWord: updatedDisplayedWord2,
    word2Guess: input.word,
    guessedLetter: badGuess,
  });

  expect(screen.getByText(updatedDisplayedWord3)).toBeInTheDocument();
});
