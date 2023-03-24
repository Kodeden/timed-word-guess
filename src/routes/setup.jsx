import { Input, Range } from "../components/form.jsx";

export default function Setup() {
  const [gameDeets, setGameDeets] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather the form details, matching the values to the names of the inputs (HTML)
    const formData = new FormData(e.target);

    // Convert the formData to an object
    const data = Object.fromEntries(formData);

    // Set the gameDeets state to the data
    setGameDeets(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Enter the word or phrase to guess"
        id="word"
        placeholder="What's the word? Is it the 🐦?"
      />
      <Range label="Max Guesses" id="maxGuesses" min={1} max={10} />
      <Range label="Max Time (minutes)" id="maxTime" min={1} max={10} />

      <button type="submit" className="button">
        Go!
      </button>
    </form>
  );
}
