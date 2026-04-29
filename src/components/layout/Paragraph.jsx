import React from "react";

const Paragraph = ({ classname, text, ...props }) => {
  return <p className={classname} {...props}>{text}</p>;
};

export default Paragraph;

