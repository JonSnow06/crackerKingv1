"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/banner.module.css";
import { useRouter } from "next/navigation";

const Banner = ({
  backgroundImage,
  mobileBackgroundImage,
  headerText,
  subheaderText,
  buttonText = "",
}) => {
  const [windowWidth, setWindowWidth] = useState(1024);
  const router = useRouter();
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
      : { backgroundImage: `url(${mobileBackgroundImage})`, height: "720px" };

  return (
    <div className={styles.bannerContainer} style={backgroundImageStyle}>
      <div className={styles.textContainer}>
        <h1 className={styles.headerText}>{headerText}</h1>
        <p className={styles.subheaderText}>{subheaderText}</p>
        {buttonText && (
          <button
            className={styles.bannerButton}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/shop")}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
