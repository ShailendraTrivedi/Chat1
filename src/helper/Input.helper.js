import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";

const InputHelper = (props) => {
  const { label, name, type, placeholder } = props;

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="">
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className="blader w-full focus:outline-none p-1 px-2"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-[10px] text-[red]"
      />
    </div>
  );
};

export default InputHelper;
