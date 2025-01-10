import React from "react";

const Input = ({ ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={props.name} className="block text-sm mb-1 font-medium">
        {props.label}
      </label>
      <input
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        className="p-2 border border-zinc-300 rounded-sm w-full"
        {...props}
      />
    </div>
  );
};

export default Input;
