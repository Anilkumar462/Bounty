import React from 'react';

export const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
  ...props
}) => {
  return (
    <div className="mb-4">
      
      {/* Label */}
      {label && (
        <label className="block text-base font-medium text-foreground mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full rounded-lg border px-4 py-2 bg-background
          text-sm font-medium resize-none
          transition-colors
          focus:outline-none focus:ring-0 focus:border-black
          ${error ? "border-destructive" : "border-input hover:border-black"}
        `}
        {...props}
      />

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
};