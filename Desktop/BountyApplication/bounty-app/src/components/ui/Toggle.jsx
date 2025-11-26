import React from "react";

export const Toggle = ({
  pressed,
  onPressedChange,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => onPressedChange(!pressed)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-300 
          ${pressed ? "bg-primary" : "bg-muted-foreground/30"}
          ${className}
        `}
        {...props}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white shadow-md
            transition-transform duration-300
            ${pressed ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};
