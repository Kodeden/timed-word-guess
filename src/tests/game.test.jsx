import { render, screen } from "@testing-library/react";
import Game, { replaceUnderscoresWithCorrectGuess } from "../routes/game";
import { setup } from "./utils";

const input = {
  word: "hello",
  maxGuesses: "5",
  maxTime: "60",
};

const initialUnderscores = input.word
  .split(
    // ⚠️ MUST put empty string to do the split 💖
    ""
  )
  .map(() => "_")
  .join("");

it("renders underscores for each letter in the word 2 guess", () => {
  render(<Game gameSettings={input} />);

  expect(screen.getByText(initialUnderscores)).toBeInTheDocument();
});

it("reveals a correct letter whenever the user types 1️⃣", async () => {
  const firstGuessedLetter = "h";
  const { user } = setup(<Game gameSettings={input} />);

  await user.keyboard(firstGuessedLetter);

  const updatedDisplayedWord1 = replaceUnderscoresWithCorrectGuess({
    displayedWord: initialUnderscores,
    word2Guess: input.word,
    guessedLetter: firstGuessedLetter,
  });

  expect(screen.getByText(updatedDisplayedWord1)).toBeInTheDocument();

  const secondGuessedLetter = "e";
  await user.keyboard(secondGuessedLetter);

  const updatedDisplayedWord2 = replaceUnderscoresWithCorrectGuess({
    displayedWord: updatedDisplayedWord1,
    word2Guess: input.word,
    guessedLetter: secondGuessedLetter,
  });

  expect(screen.getByText(updatedDisplayedWord2)).toBeInTheDocument();
});
