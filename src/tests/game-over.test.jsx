import { render, screen } from "@testing-library/react";
import GameOver from "../components/game-over";

it("renders without crashing", () => {
  const gameOverRender = render(<GameOver />);
  expect(gameOverRender).toMatchSnapshot();
});

it("displays a winning message/image", () => {
  render(<GameOver status="won" />);

  expect(screen.getByText(/won/i, { selector: "h2" })).toBeInTheDocument();

  // We are not testing external resources (e.g. Giphy API)
  expect(screen.getByAltText(/won/i)).toBeInTheDocument();
});

it("displays a losing message/image", () => {
  render(<GameOver status="lost" />);

  expect(screen.getByText(/lost/i, { selector: "h2" })).toBeInTheDocument();

  // We are not testing external resources (e.g. Giphy API)
  expect(screen.getByAltText(/lost/i)).toBeInTheDocument();
});
