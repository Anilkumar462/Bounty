import React from 'react';

export const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error, 
  maxLength,
  type = "text",
  ...props 
}) => {
  return (
    <div className="mb-4 w-full">
      {/* Label */}
      {label && (
        <label className="block text-base font-medium text-foreground mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`
          h-11 w-full rounded-xl border px-4 py-2
          text-sm bg-background transition
          focus:outline-none focus:ring-0 focus:border-black
          placeholder:text-muted-foreground
          ${error ? "border-destructive" : "border-input hover:border-black"}
        `}
        {...props}
      />

      {/* Error Text */}
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}

      {/* Character Counter */}
      {maxLength && (
        <p className="text-xs text-muted-foreground text-right mt-1">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};