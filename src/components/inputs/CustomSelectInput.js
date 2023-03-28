import { useField } from "formik";
import React from "react";

export const CustomSelectInput = ({
  field,
  form,
  className,
  label,
  labelClass,
  inputClass,
  optionClass,
  options,
  ...props
}) => {
  return (
    <label className={className}>
      <div className={labelClass}>{label} </div>
      <select {...field} className={inputClass} {...props}>
        <option value={null} disabled selected hidden></option>
        {options.map((option, index) => {
          return (
            <option className={optionClass} value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
};
