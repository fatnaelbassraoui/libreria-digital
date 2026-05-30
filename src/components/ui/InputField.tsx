import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "email" | "password";
  required?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  setValue,
  type = "text",
  required = true,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className="text-sm font-medium text-sky-900 cursor-pointer"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white border border-sky-800 text-sky-900 text-sm rounded-lg 
                   focus:ring-2 focus:ring-sky-500 focus:border-sky-900 focus:outline-none 
                   block p-3.5 transition-all placeholder-gray-400"
      />
    </div>
  );
};

export default InputField;