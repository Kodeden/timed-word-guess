import { render, screen } from "@testing-library/react";
import App from "../App";
import { expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

// TODO: Update these tests to account for any word
it("displays 4 dashes", () => {
  render(<App />);
  expect(screen.getByText(/____/)).toBeInTheDocument();
});

it("reveals the letter when guessed", async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByLabelText(/guess a letter/i);

  await user.type(input, "b");

  expect(screen.getByText(/b___/)).toBeInTheDocument();
});

it("reveals the letter when guessed (case-insensitive)", async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByLabelText(/guess a letter/i);

  await user.type(input, "B");

  expect(screen.getByText(/b___/i)).toBeInTheDocument();
});

it("reveals the letter when guessed (multiple times)", async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByLabelText(/guess a letter/i);

  await user.type(input, "b");
  await user.type(input, "i");

  expect(screen.getByText(/bi/i)).toBeInTheDocument();
});

it("clears the input after each guess", async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = screen.getByLabelText(/guess a letter/i);
  await user.type(input, "b");

  expect(input).toHaveValue("");
});
