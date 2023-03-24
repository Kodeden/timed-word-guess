import camelCase from "lodash/camelCase";
import PropTypes from "prop-types";

export default function Range({ label, id, min, max, step, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        name={camelCase(id)}
      />
    </div>
  );
}

Range.defaultProps = {
  min: 0,
  max: 5,
  step: 1,
  value: 3,
};

Range.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
