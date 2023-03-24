import PropTypes from "prop-types";
import { Input, Range } from "../components/form";

export default function Setup({ handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <Input label="Enter the Word or Phrase to Guess" id="word" />
      <Range label="Max Guesses" id="maxGuesses" min={1} max={10} />
      <Range label="Max Time (minutes)" id="maxTime" min={1} max={10} />

      <button type="submit" className="button">
        Go!
      </button>
    </form>
  );
}

Setup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
