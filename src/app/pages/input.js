"use client";
import React from "react";
import styles from "../styles/InputField.module.css";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  width = "100%",
}) => {
  return (
    <div className={styles.inputField}>
      {label && (
        <p htmlFor={name} className={styles.label}>
          {label}
        </p>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={styles.input}
        style={{ width: width }}
      />
    </div>
  );
};

export default InputField;
