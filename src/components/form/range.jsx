import camelCase from "lodash/camelCase";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Range({ label, id, min, max, step }) {
  const [value, setValue] = useState(min);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-1 border-b pb-2">
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        name={camelCase(id)}
        value={value}
        onChange={handleChange}
      />
      <p>
        Value: <output id="value">{value}</output>
      </p>
    </div>
  );
}

Range.defaultProps = {
  min: 0,
  max: 5,
  step: 1,
};

Range.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};
