import React, { useState, useRef, useEffect } from 'react';

const MultiSelect = ({
  label,
  options = [],
  selectedValues = [],
  onChange,
  required = false,
  error,
  className = "",
  placeholder = "Select options",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(updated);
  };

  const displayValue = () => {
    if (!selectedValues.length) return placeholder;
    if (selectedValues.length === 1) {
      return options.find((o) => o.value === selectedValues[0])?.label || selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <div className={`mb-4 ${className}`} ref={wrapperRef}>
      {label && (
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-3 py-2 rounded border bg-white shadow-sm flex justify-between items-center cursor-pointer
          ${error ? "border-red-500" : "border-gray-300"}
          focus:outline-none focus:ring-0 focus:border-black`}
        {...props}
      >
        <span className={selectedValues.length ? "text-gray-800" : "text-gray-400"}>
          {displayValue()}
        </span>

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="mr-2 focus:ring-0 focus:outline-none focus:border-black"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelect;
