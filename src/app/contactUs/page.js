"use client";
import React, { useEffect, useState } from "react";
import Styles from "../styles/contactUs.module.css";
import youtube from "../assets/utube.svg";
import facebook from "../assets/fb.svg";
import instagram from "../assets/insta.svg";
import Image from "next/image";
import { CRACKER_DATA } from "../cosntant";
import Navbar from "../pages/navbar";
import Footer from "../pages/Footer";
import map from "../assets/map.png";
import Banner from "../pages/banner";
// Example Slide Components

const contactUs = () => {
  const [fireData, setFirerData] = useState(CRACKER_DATA || []);
  const [shopKart, setShopKart] = useState([]);

  // useEffect(() => {
  //   setFirerData(CRACKER_DATA);
  // }, []);
  const backgroundImageStyle = (imageUrl) => {
    return {
      backgroundImage: `url(${imageUrl})`,
      height: "143px", // Adjust as needed
      width: "138px", // Adjust as needed
    };
  };

  const options = ["flowerSpot", "Bomb", "Shot"];

  const handleCardClick = (id, key, type, value, coutType) => {
    let val = "";
    if (type === "count" && coutType === "add") {
      val = value + 1;
    } else if (type === "count" && coutType === "minus" && value > 0) {
      val = value - 1;
    } else if (type === "count" && coutType === "minus" && value === 0) {
      val = 0;
    }
    if (type === "Selection") {
      val = !value;
    }

    const data = fireData.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          sparklersData: item?.sparklersData.map((item) => {
            if (item?.key === key) {
              return { ...item, [type]: val };
            } else {
              return item;
            }
          }),
        };
      }
      return item;
    });
    setFirerData(data);
    const valData = data.map(({ sparklersData }) => sparklersData);
    const dataVal = valData.flat();
    const checkoutData = dataVal.filter((item) => item?.Selection === true);
    sessionStorage.setItem("cartData", checkoutData);
    // console.log(checkoutData, "dataVal");
    setShopKart(checkoutData);
  };
  return (
    <>
      <Navbar fireData={shopKart} />
      {/* <div className={Styles.bannerBg1}>
        <p className={Styles.bannerHeader}>Enjoy Diwali’s Sale! </p>
        <p className={Styles.bannerSubHeader} style={{ marginTop: "10px" }}>
          Cracker’s King
        </p>
      </div> */}
      <Banner
        backgroundImage={"/contactUsBg.jpeg"}
        headerText="Enjoy Diwali’s Sale! "
        subheaderText="Cracker’s King"
        mobileBackgroundImage={"/mobilecontactBg.png"}
      />

      <div className={Styles.contactUsContainer}>
        <div className={Styles.contactUsInnerContainer}>
          <div className={Styles.contactUsContent}>
            <p className={Styles.contactUsHeader}>Contact Details</p>
            <div className={Styles.contactUsDetails}>
              <p className={Styles.contactUskey}>Address</p>
              <p className={Styles.contactUsValue}>
                1/1468 V1,Jeyarathinam nagar, Viswanatham road sivakasi.626123
                tamilnadu
              </p>
            </div>
            <div className={Styles.contactUsDetails}>
              <p className={Styles.contactUskey}>Contact</p>
              <p className={Styles.contactUsValue}>
                +91 88077 75335, +91 93601 97778
              </p>
            </div>
            <div className={Styles.contactUsDetails}>
              <p className={Styles.contactUskey}>Mail</p>
              <p className={Styles.contactUsValue}>crackersking@gmail.com</p>
            </div>
          </div>
          <p className={Styles.contactUsFollowUsOn}>Follow Us On</p>
          <div className={Styles.socialIcons}>
            <Image src={youtube} />
            <Image src={facebook} />
            <Image src={instagram} />
          </div>
        </div>
        <Image src={map} className={Styles.contactUsMap} />
      </div>

      <Footer />
    </>
  );
};

export default contactUs;
