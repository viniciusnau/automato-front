import React from "react";
import styles from "./Button.module.css";

interface iButton {
  className?: any;
  content?: any;
  onClick?: any;
  children?: any;
  type?: any;
  htmlFor?: any;
  alt?: string;
  title?: string;
  disabled?: any;
  style?: any;
  id?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<iButton> = ({
  className,
  id,
  onClick,
  children,
  disabled,
  ref,
  ...props
}) => {
  return (
    <button
      id={id}
      ref={ref} 
      className={`${styles.container} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
