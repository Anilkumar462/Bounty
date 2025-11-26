import React from 'react';

export const RadioGroup = ({
  label,
  value,
  onValueChange,
  options,
  required = false,
  error,
  name,
  ...props
}) => {
  return (
    <div className="mb-4">
      
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Radio Options */}
      <div className="flex items-center gap-6">
        {options.map((option, index) => {
          const val = option.value || option;
          const labelText = option.label || option;

          return (
            <label
              key={index}
              className="
                flex items-center gap-2 cursor-pointer 
                text-sm select-none
              "
            >
              <input
                type="radio"
                name={name}
                value={val}
                checked={value === val}
                onChange={(e) => onValueChange(e.target.value)}
                className="
                  h-4 w-4 rounded-full border-gray-300 text-primary 
                  focus:ring-0 focus:outline-none focus:border-black
                "
                {...props}
              />

              <span>{labelText}</span>
            </label>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
};