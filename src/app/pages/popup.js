// components/Popup.js
"use client";
import React from "react";
import Styles from "../styles/popup.module.css";

const Popup = ({ message, onClose }) => {
  return (
    <div className={Styles.popupOverlay}>
      <div className={Styles.popupContent}>
        <span className={Styles.closeIcon} onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
