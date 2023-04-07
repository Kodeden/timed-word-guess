import { useEffect, useState } from "react";
import api from "../api";

export default function useGameOver(status) {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    api.show(status === "won" ? "Winner" : "Loser").then((response) => {
      setGif(response.data[0].images.original.url);
    });
  });

  return gif;
}
