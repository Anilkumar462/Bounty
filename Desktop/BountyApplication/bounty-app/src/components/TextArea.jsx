import React from "react";

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
    <div className="space-y-1.5 mb-4">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm shadow-sm 
          focus:outline-none focus:ring-0 focus:border-black
          ${error ? "border-destructive" : "border-input"}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-destructive mt-0.5">{error}</p>
      )}
    </div>
  );
};