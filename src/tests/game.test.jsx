import { render, screen } from "@testing-library/react";
import Game from "../routes/game";

const input = {
  word: "hello",
  maxGuesses: "5",
  maxTime: "60",
};

it("renders underscores for each letter in the word 2 guess", () => {
  render(<Game gameSettings={input} />);

  expect(
    screen.getByText(
      input.word
        .split(
          // ⚠️ MUST put empty string to do the split 💖
          ""
        )
        .map(() => "_")
        .join("")
    )
  ).toBeInTheDocument();
});
