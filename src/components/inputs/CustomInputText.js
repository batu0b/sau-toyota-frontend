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
      <input
        className={inputClass}
        style={
          form.touched[field.name] && form.errors[field.name]
            ? { borderColor: "red", borderWidth: 2 }
            : null
        }
        {...field}
        {...props}
      />
    </label>
  );
};
