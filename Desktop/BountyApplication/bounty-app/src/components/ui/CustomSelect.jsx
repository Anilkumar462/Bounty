import React, { useState, useRef, useEffect } from 'react';

export const CustomSelect = ({
  label,
  value,
  onValueChange,
  options,
  required = false,
  error,
  placeholder = "Select an option",
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

  const handleOptionClick = (optionValue) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (!value) return placeholder;
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className="mb-4 w-full">
      {/* Label */}
      {label && (
        <label className="block text-base font-medium text-foreground mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Trigger - Position relative for dropdown alignment */}
      <div className="relative" ref={triggerRef} {...props}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-between w-full
            border rounded-lg px-3 py-2 text-sm
            bg-background cursor-pointer
            transition-colors
            focus:outline-none focus:ring-0 focus:border-black
            ${error ? "border-destructive" : "border-input hover:border-black"}
            ${isOpen ? "border-black" : ""}
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

        {/* Dropdown - Custom popover style */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="
              absolute z-50 mt-1 w-full
              bg-white rounded-lg shadow-lg
              overflow-hidden
              animate-in fade-in-0 zoom-in-95
            "
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`
                  px-3 py-2 cursor-pointer text-sm
                  ${value === option.value 
                    ? "bg-muted/20 text-foreground" 
                    : "text-foreground hover:bg-muted/10"}
                `}
              >
                {option.label}
              </div>
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