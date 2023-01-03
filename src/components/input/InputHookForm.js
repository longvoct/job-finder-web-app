import React from "react";
import { useController } from "react-hook-form";

const InputHookForm = ({ control, className, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className={`p-4 mb-2 border border-solid text-[#141418]  border-gray-200 rounded-lg focus:border-[#7C73F8] transition-all ${className}`}
      {...field}
      {...props}
    />
  );
};

export default InputHookForm;
