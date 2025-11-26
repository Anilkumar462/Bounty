import React from "react";

export const Toggle = ({
  label,
  description,
  pressed,
  onPressedChange,
  required = false,
  className = "",
}) => {
  return (
    <div className="space-y-1.5 mb-4">
      {label && (
        <label className="text-sm font-medium text-foreground flex items-center gap-1">
          {label} 
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      {description && (
        <p className="text-xs text-muted-foreground -mt-1">{description}</p>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={pressed}
        onClick={() => onPressedChange(!pressed)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 
          ${pressed ? "bg-primary" : "bg-muted-foreground/30"}
          ${className}
        `}
        data-state={pressed ? "on" : "off"}
      >
        <span
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200
            data-[state=on]:translate-x-5
          "
          data-state={pressed ? "on" : "off"}
        />
      </button>
    </div>
  );
};
