import PropTypes from "prop-types";
import useGameOver from "../hooks/use-game-over";

export default function GameOver({ status }) {
  const gif = useGameOver(status);

  return (
    <section className="container mx-auto flex flex-col justify-center">
      <h2
        className={`${
          status === "won" ? "text-green-400" : "text-red-400"
        } my-2 text-center text-2xl font-black capitalize `}
      >
        You {status}!
      </h2>
      <img src={gif} alt={status} />

      <button className="button" onClick={() => window.location.reload()}>
        Shall we play again?
      </button>
    </section>
  );
}

GameOver.propTypes = {
  status: PropTypes.oneOf(["won", "lost"]).isRequired,
};
