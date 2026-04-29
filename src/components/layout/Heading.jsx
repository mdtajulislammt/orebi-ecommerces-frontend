import React from "react";

const Heading = ({ tagname: Tag = "h1", text, className, ...props }) => {
  return <Tag className={className} {...props}>{text}</Tag>;
};

export default Heading;

