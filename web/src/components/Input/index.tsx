import React, { InputHTMLAttributes, memo } from "react";

import "./style.css";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<IInputProps> = ({ label, name, ...inputProps }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...inputProps} />
    </div>
  );
};

export default memo(Input);
