import React, { SelectHTMLAttributes, memo } from "react";

import "./style.css";

interface IOptions {
  value: string;
  label: string;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: IOptions[];
}

const Select: React.FC<ISelectProps> = ({
  label,
  name,
  options,
  ...SelectProps
}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select defaultValue="" required id={name} {...SelectProps}>
        <option hidden disabled value="">
          Selecione uma opção
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Select);
