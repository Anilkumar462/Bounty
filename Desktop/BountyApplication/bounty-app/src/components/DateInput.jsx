import React from 'react';

const DateInput = ({
  label,
  value,
  onChange,
  required = false,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 rounded border shadow-sm text-gray-700 
          focus:outline-none focus:ring-0 focus:border-black
          ${error ? "border-red-500" : "border-gray-300 hover:border-black"}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-xs italic mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default DateInput;