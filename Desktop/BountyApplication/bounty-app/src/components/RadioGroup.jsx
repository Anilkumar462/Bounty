import React from "react";

const RadioGroup = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex space-x-6">
        {options.map((option, index) => {
          const val = option.value || option;
          const labelText = option.label || option;

          return (
            <label
              key={index}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                type="radio"
                value={val}
                checked={value === val}
                onChange={(e) => onChange(e.target.value)}
                className={`h-4 w-4 text-orange-500 border-gray-300 focus:ring-0 focus:outline-none focus:border-black`}
                {...props}
              />
              <span className="ml-2 text-gray-700">{labelText}</span>
            </label>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default RadioGroup;