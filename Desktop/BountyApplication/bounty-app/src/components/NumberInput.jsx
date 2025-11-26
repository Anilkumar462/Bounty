import React from "react";

const NumberInput = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  min,
  max,
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

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`
          w-full px-4 py-2 rounded-lg border bg-white text-gray-800
          focus:outline-none focus:ring-0 focus:border-black
          transition-all shadow-sm
          ${error ? "border-red-500" : "border-gray-300"}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default NumberInput;