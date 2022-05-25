import React from "react";

//make an a reusable input component for any kind of input
export const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} className="form-control" id={name} name={name} />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};
