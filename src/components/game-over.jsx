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
    <section>
      <h2 className="text-4xl font-black">Game Over</h2>
      <p className="text-2xl font-bold capitalize">You {status}!</p>
      <img src={gif} alt={status} />
    </section>
  );
}

GameOver.propTypes = {
  status: PropTypes.oneOf(["won", "lost"]).isRequired,
};
