import React, { FunctionComponent, HTMLProps } from "react";

interface Props {}

const Button: FunctionComponent<Props & HTMLProps<HTMLButtonElement>> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
};

export default Button;
