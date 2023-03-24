import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../api";

export default function GameOver({ status }) {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    api.show(status === "won" ? "Winner" : "Loser").then((response) => {
      setGif(response.data[0].images.original.url);
    });
  });

  return (
    <section className="flex flex-col justify-center">
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
