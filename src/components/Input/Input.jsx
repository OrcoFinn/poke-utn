import React from "react";
import "./Input.css";

function Input({ label, ...props }) {
  return (
    <div className="input">
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </div>
  );
}

export default Input;
