import { render, screen } from "@testing-library/react";
import GameOver from "../components/game-over";

it("renders 'You won!' when the status is 'won'", () => {
  render(<GameOver status="won" />);

  expect(screen.getByText(/won/i, { selector: "h2" })).toBeInTheDocument();
});

it("renders 'You lost!' when the status is 'lost'", () => {
  render(<GameOver status="lost" />);

  expect(screen.getByText(/lost/i, { selector: "h2" })).toBeInTheDocument();
});
