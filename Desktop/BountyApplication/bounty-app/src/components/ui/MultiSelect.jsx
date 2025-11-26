import React, { useState, useRef, useEffect } from 'react';

export const MultiSelect = ({ 
  label, 
  options, 
  value, 
  onValueChange, 
  required = false, 
  error,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];

    // Limit to 4 selections as per requirements
    if (newValue.length <= 4) {
      onValueChange(newValue);
    }
  };

  const getDisplayText = () => {
    if (value.length === 0) return 'Select options';
    if (value.length === 1) {
      return options.find(opt => opt.value === value[0])?.label || value[0];
    }
    return `${value.length} selected`;
  };

  return (
    <div className="mb-4 w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Trigger - Position relative for dropdown alignment */}
      <div className="relative" ref={triggerRef} {...props}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-between h-11 w-full
            rounded-xl border px-4 py-2 cursor-pointer
            bg-background text-sm transition 
            focus:outline-none focus:ring-0 focus:border-black
            ${error ? "border-destructive" : "border-input hover:border-black"}
          `}
        >
          <span className="truncate">{getDisplayText()}</span>

          {/* Arrow Icon */}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown - Floating popover style */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="
              absolute z-50 mt-1 w-full
              bg-background border border-input
              rounded-xl shadow-lg
              max-h-[220px] overflow-y-auto
              py-2
              animate-in fade-in-0 zoom-in-95
            "
          >
            {options.map((option) => (
              <label
                key={option.value}
                className="
                  flex items-center gap-3 px-4 py-2
                  text-sm cursor-pointer
                  hover:bg-black/10
                "
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-0 focus:outline-none focus:border-black"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
};