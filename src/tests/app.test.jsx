import { fireEvent } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { setup } from "./utils";

it("renders the setup screen", () => {
  const setupRender = render(<App />);
  expect(setupRender).toMatchSnapshot();
});

it("calls the player a loser", async () => {
  const { user } = setup(<App />);

  const wordTextInput = screen.getByLabelText(/word/i);
  const maxGuessesRangeInput = screen.getByLabelText(/max guesses/i);
  const submitButton = screen.getByRole("button", { name: /go/i });

  await user.type(wordTextInput, "hello");

  // AFAIK, we can't do range sliders with 'userEvent' yet
  // https://github.com/testing-library/user-event/issues/871#issuecomment-1059317998
  fireEvent.change(maxGuessesRangeInput, { target: { value: 5 } });

  await user.click(submitButton);

  // Wait for the underscores to appear ('game' test ✅ already verifies this)
  await screen.findByText(/_/i);

  // Make 5 incorrect guesses
  await user.keyboard("asdfg");

  // Wait for the 'loser' message to appear
  await screen.findByText(/lost/i);
});

it("calls the player a winner", async () => {
  const { user } = setup(<App />);

  const wordTextInput = screen.getByLabelText(/word/i);
  // We're not doing any wrong guesses anyway
  const submitButton = screen.getByRole("button", { name: /go/i });

  await user.type(wordTextInput, "hello");
  await user.click(submitButton);

  // Wait for the underscores to appear ('game' test ✅ already verifies this)
  await screen.findByText(/_/i);

  await user.keyboard("hello");

  // Wait for the 'winner' message to appear
  await screen.findByText(/won/i);
});
