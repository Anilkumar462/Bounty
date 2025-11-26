import React from "react";

export const Checkbox = ({
  label,
  checked,
  onCheckedChange,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-start gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="
            h-4 w-4 rounded 
            border border-gray-300 
            text-primary 
            focus:ring-0 focus:outline-none focus:border-black
            cursor-pointer
          "
          {...props}
        />
        <span className="text-sm text-foreground">{label}</span>
      </label>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};