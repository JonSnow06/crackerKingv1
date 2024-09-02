"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Banner.module.css";

const Banner = ({
  backgroundImage,
  mobileBackgroundImage,
  headerText,
  subheaderText,
  buttonText = "",
  onButtonClick,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImageStyle =
    windowWidth > 600
      ? { backgroundImage: `url(${backgroundImage})`, height: "100vh" }
      : { backgroundImage: `url(${mobileBackgroundImage})`, height: "213vh" };

  return (
    <div className={styles.bannerContainer} style={backgroundImageStyle}>
      <div className={styles.textContainer}>
        <h1 className={styles.headerText}>{headerText}</h1>
        <p className={styles.subheaderText}>{subheaderText}</p>
        {buttonText && (
          <button className={styles.bannerButton} onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
