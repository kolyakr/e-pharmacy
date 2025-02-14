import React from "react";

const Ellipsis = ({
  text,
  length,
  className,
}: {
  text: string;
  length: number;
  className: string;
}) => {
  if (length < 3) {
    throw new Error("Min length must be 3 characters");
  }

  const isValidLength = text.length < length;

  return (
    <p className={className}>
      {isValidLength ? text : `${text.slice(0, length - 3)}...`}
    </p>
  );
};

export default Ellipsis;
