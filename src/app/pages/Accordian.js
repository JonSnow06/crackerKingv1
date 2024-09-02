// components/Accordian.js
"use client";
import React from "react";
import Image from "next/image";
import Styles from "../styles/accordian.module.css";
import Add from "../assets/Add.png";
import Remove from "../assets/accordianClose.png";

const Accordian = ({ slides }) => {
  const [openItems, setOpenItems] = React.useState({}); // State to manage open items

  const handleToggle = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle individual item state
    }));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ maxWidth: "809px", width: "100%" }}>
        {slides.map((slide, index) => (
          <div key={index} className={Styles.accordianBorder}>
            <div className={Styles.accordianWrapper}>
              <div className={Styles.accordianText}>
                <div className={Styles.accordianNumber}>{`0${index + 1}`}</div>
                <p className={Styles.accordianContent}>{slide.question}</p>
              </div>
              <Image
                src={openItems[index] ? Remove : Add}
                alt="Toggle"
                onClick={() => handleToggle(index)}
              />
            </div>
            <div
              className={
                openItems[index]
                  ? `${Styles.accordianDescription}`
                  : `${Styles.accordianRemove}`
              }
            >
              <p className={Styles.accordianDesc}>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordian;
