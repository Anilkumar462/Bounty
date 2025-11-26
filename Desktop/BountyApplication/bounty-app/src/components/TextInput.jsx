import React from "react";

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
    <div className="space-y-1.5 mb-4">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm shadow-sm 
          focus:outline-none focus:ring-0 focus:border-black
          ${error ? "border-destructive" : "border-input"}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-destructive mt-0.5">{error}</p>
      )}

      {maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {value?.length || 0}/{maxLength}
        </p>
      )}
    </div>
  );
};