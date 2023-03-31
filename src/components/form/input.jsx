import camelCase from "lodash/camelCase";
import PropTypes from "prop-types";

export default function Input({ label, id, type, placeholder, required }) {
  return (
    <div className="flex w-full flex-col items-center gap-y-2 text-center">
      <label htmlFor={id} className="mr-4 font-medium">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        required={required}
        name={camelCase(id)}
        type={type}
        className="w-full max-w-fit rounded-sm border-2 border-none border-gray-300 p-2 text-gray-800"
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
