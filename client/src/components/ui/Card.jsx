import React from "react";

const Card = (props) => {
  let classes = "p-4 bg-white border border-zinc-300 rounded-sm shadow-md";

  if (props.className) classes = classes.concat(` ${props.className}`);

  return <div className={classes}>{props.children}</div>;
};

export default Card;
