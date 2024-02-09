import { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(({ type, purpose, value, onChange }, ref) => {
  return (
    <div className="mt-2">
      <input
        id={purpose}
        name={purpose}
        type={type}
        autoComplete={purpose}
        placeholder={`Enter your ${purpose}`}
        required
        className="p-3 block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-indigo-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  purpose: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
