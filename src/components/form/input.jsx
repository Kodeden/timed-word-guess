import camelCase from "lodash/camelCase";
import PropTypes from "prop-types";

export default function Input({ label, id, type, placeholder, required }) {
  return (
    <div className="w-full space-y-2 text-center">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder || label}
        required={required}
        name={camelCase(id)}
        type={type}
        className="w-full rounded-sm border-2 border-none border-gray-300 p-2 text-gray-800"
      />
    </div>
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: null,
  required: true,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
