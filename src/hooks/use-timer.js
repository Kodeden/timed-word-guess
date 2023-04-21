import { useEffect } from "react";

export default function useTimer(timeRemaining, setTimeRemaining) {
  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 100);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeRemaining, setTimeRemaining]);

  const minutes = Math.floor(timeRemaining / 600);
  const seconds = Math.floor((timeRemaining % 600) / 10);
  const tenths = timeRemaining % 10;

  return {
    minutes,
    seconds,
    tenths,
  };
}
