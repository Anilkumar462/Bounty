import React from 'react';
import { CustomSelect } from './CustomSelect';

export const Select = ({
  label,
  value,
  onValueChange,
  options,
  required = false,
  error,
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <CustomSelect
      label={label}
      value={value}
      onValueChange={onValueChange}
      options={options}
      required={required}
      error={error}
      placeholder={placeholder}
      {...props}
    />
  );
};