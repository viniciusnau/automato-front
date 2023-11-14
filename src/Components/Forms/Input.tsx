import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import { useSelector } from "react-redux";

interface iInput {
  className?: any;
  name?: string;
  value?: any;
  content?: any;
  onClick?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  type?: any;
  placeholder?: string;
  onKeyPress?: any;
  id?: any;
  readOnly?: boolean;
  min?: string;
  max?: number;
  step?: string;
  pattern?: string;
  checked?: boolean;
  onKeyUp?: any;
  defaultValue?: any;
  label?: string;
}

const Input: React.FC<iInput> = ({
  className,
  onClick,
  checked,
  max,
  name,
  label,
  ...props
}) => {
  const [isColorInverted, setIsColorInverted] = useState<{
    [key: string]: boolean;
  }>({});
  const colorInvertedState = useSelector(
    (state: any) => state.a11ySlice.colorInverted
  );

  useEffect(() => {
    setIsColorInverted(colorInvertedState);
  }, [colorInvertedState]);

  return (
    <div className={styles.container}>
      {label && (
        <label
          className={styles.label}
          htmlFor={name}
          style={{ color: isColorInverted ? "#fafafa" : "initial" }}
        >
          {label + ":"}
        </label>
      )}
      <input
        className={`${styles.content} ${className}`}
        onClick={onClick}
        checked={checked}
        maxLength={max}
        name={name}
        {...props}
      ></input>
    </div>
  );
};

export default Input;
