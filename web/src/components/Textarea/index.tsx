import React, { TextareaHTMLAttributes, memo } from "react";

import "./style.css";

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const Textarea: React.FC<ITextareaProps> = ({
  label,
  name,
  ...textareaProps
}) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} {...textareaProps} />
    </div>
  );
};

export default memo(Textarea);
