import { useField } from "formik";
import React from "react";

export const CustomInputText = ({
  field,
  form,
  className,
  label,
  labelClass,
  inputClass,
  ...props
}) => {
  return (
    <label className={className}>
      <div className={labelClass}>{label} </div>
      <input className={inputClass} max={3} {...field} {...props} />
    </label>
  );
};
