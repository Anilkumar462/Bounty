import React from 'react';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
          focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : ""
          }`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt, index) => {
          const optionValue = typeof opt === "object" ? opt.value : opt;
          const optionLabel = typeof opt === "object" ? opt.label : opt;

          return (
            <option key={index} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>

      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default Select;
