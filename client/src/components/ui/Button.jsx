import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Button = (props) => {
  return (
    <button
      className={`p-2 rounded-sm bg-secondary text-white text-center ${
        props.className ? props.className : ""
      }`}
    >
      {props.loading ? (
        <Loader2 className="animate-spin inline" />
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
