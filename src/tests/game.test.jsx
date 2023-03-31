import { render, screen } from "@testing-library/react";
import Game, { replaceUnderscoresWithCorrectGuess } from "../routes/game";
import { setup } from "./utils";

const input = {
  word: "test",
  maxGuesses: "5",
  maxTime: "60",
};

const initialUnderscores = input.word.replace(/[a-z]/gi, "_");

it("renders underscores for each letter in the word", () => {
  render(<Game gameSettings={input} />);

  expect(screen.getByText(initialUnderscores)).toBeInTheDocument();
});
