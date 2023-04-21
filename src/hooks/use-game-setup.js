import { useState } from "react";

export default function useGameSetup() {
  const [gameSetup, setGameSetup] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather the form details, matching the values to the names of the inputs (HTML)
    const formData = new FormData(e.target);

    // Convert the formData to an object
    const data = Object.fromEntries(formData);

    // Set the gameDeets state to the data
    setGameSetup(data);
  };

  return [gameSetup, handleSubmit];
}
