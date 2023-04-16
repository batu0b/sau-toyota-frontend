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
      <select {...field} className={inputClass} style={form.touched[field.name] && form.errors[field.name] ? {borderColor: "red" , borderWidth: 2} : null} {...props}>
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
