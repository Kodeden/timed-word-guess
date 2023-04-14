import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Game, { replaceUnderscoresWithCorrectGuess } from "../routes/game";
import { setup } from "./utils";

const input = {
  word: "test",
  maxGuesses: "5",
  maxTime: "6",
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

describe("Timer", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  /**
   * When using fake timers, you need to remember to restore the timers after your test runs.
   *
   * The main reason to do that is to prevent 3rd party libraries running after your test finishes (e.g cleanup
   * functions), from being coupled to your fake timers and use real timers instead.
   *
   * For that you usually call useRealTimers...
   * https://testing-library.com/docs/using-fake-timers/
   */
  afterAll(() => {
    vi.useRealTimers();
  });

  test("timer reflects the time remaining ('M:SS.S')", async () => {
    render(<Game gameSettings={input} />);

    const timeDisplay = screen.getByTestId("timer-display");

    // ⚠️ DON'T do a 'waitFor' here b/c the timer starts at 6:00.0.
    expect(timeDisplay).toHaveTextContent("6:00.0"); // ☝️

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    expect(timeDisplay).toHaveTextContent("5:30.0");

    act(() => {
      // 1 second
      vi.advanceTimersByTime(1000);
    });

    expect(timeDisplay).toHaveTextContent("5:29.0");
  });

  test("shows the loser screen when the timer reaches 0", async () => {
    render(<Game gameSettings={input} />);

    act(() => {
      // 6 minutes
      vi.advanceTimersByTime(360000);
    });

    expect(screen.getByText(/you lost/i)).toBeInTheDocument();
  });
});
