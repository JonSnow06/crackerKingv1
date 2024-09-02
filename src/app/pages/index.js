// components/Accordian.js
"use client";
import React from "react";
import leftshotcracker from "../assets/leftshotcracker.svg";
import rightshotcracker from "../assets/rightshotcracker.svg";
import AccordianComponent from "./Accordian";
import start from "../assets/star.svg";
import Image from "next/image";
import Styles from "../styles/homePage.module.css";
import { accordian, crackKingData, missionData, reviewData } from "../cosntant";
import CarouselComponent from "./CarouselComponent";
import Navbar from "./navbar";
import Footer from "./Footer";
import Banner from "./banner";
const slide = () => {
  return (
    <>
      <Banner
        backgroundImage={"/bg1.jpeg"}
        headerText="Diwali Celebration Sale"
        subheaderText="The Biggest Deals of the Year!"
        buttonText="Contact Us"
        mobileBackgroundImage={"/mobileBg1.png"}
      />
    </>
  );
};
const slide1 = () => {
  return (
    <>
      <Banner
        backgroundImage={"/bg2.jpeg"}
        headerText="Diwali Mega Sale"
        subheaderText="Get Up to 85% Off on Every Product!"
        buttonText="Contact Us"
        mobileBackgroundImage={"/mobileBg2.png"}
      />
    </>
  );
};
const slide2 = () => {
  return (
    <>
      <Banner
        backgroundImage={"/bg3.jpeg"}
        headerText="Diwali Celebration Sale"
        subheaderText="Mega Sale with Exciting Limited-Time Deals!"
        buttonText="Contact Us"
        mobileBackgroundImage={"/mobileBg3.png"}
      />
    </>
  );
};
const homePage = () => {
  const backgroundImageStyle = (imageUrl) => {
    return {
      backgroundImage: `url(${imageUrl})`,
      height: "143px", // Adjust as needed
      width: "138px", // Adjust as needed
    };
  };
  console.log(window.innerWidth, "king");
  return (
    <>
      <Navbar />
      <CarouselComponent slides={[slide, slide1, slide2]} />
      <div className={Styles.homeBackgroundColor}>
        <div className={Styles.homeContainer}>
          {/* FirstComponent */}
          <div className={Styles.experienceCracker}>
            <p className={Styles.experienceTitle}>
              Experience a cracker lover's dream fulfilled
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className={Styles.subHeading}>
                Our collection is full of excitement! Need more information?
                Don't be a firecracker; reach out! We're here to make your
                Diwali experience unforgettable.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div className={Styles.crackersCard}>
                <div style={backgroundImageStyle("/crackerImage.svg")}></div>
                <p className={Styles.crackerTitle}>Crackers</p>
              </div>
              <div className={Styles.crackersCard}>
                <div style={backgroundImageStyle("/crackerImage.svg")}></div>
                <p className={Styles.crackerTitle}>Crackers</p>
              </div>
              <div className={Styles.crackersCard}>
                <div style={backgroundImageStyle("/crackerImage.svg")}></div>
                <p className={Styles.crackerTitle}>Crackers</p>
              </div>
            </div>
          </div>
          {/* Second  Component */}
          <div style={{ marginTop: "96px", marginBottom: "130px" }}>
            <p className={Styles.crackerHeading}>Why Cracker’s King?</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "21px",
                flexWrap: "wrap",
              }}
            >
              {crackKingData.map((card) => (
                <div key={card.id} className={Styles.crackerKingCard}>
                  <Image src={card.image} alt={card.title} />
                  <p className={Styles.crackerKingTitle}>{card.title}</p>
                  <p className={Styles.crackerKingDesc}>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.homeBulkSaving}>
        <Image src={leftshotcracker} alt="leftshotcracker" />
        <div className={Styles.bulkSavingWrapper}>
          <p className={Styles.bulksavingHeader}>
            Unlock Big Bulk Savings for Diwali
          </p>
          <p className={Styles.bulksavingDesc}>
            Want better deals than everyone else? Contact us to discover special
            discounts on bulk orders and make your Diwali
            celebration truly amazing!
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={Styles.bulksavingBtn}>Quick Connect</button>
          </div>
        </div>

        <Image src={rightshotcracker} alt="rightshotcracker" />
      </div>
      <div className={Styles.homeBackgroundColor}>
        <div className={Styles.homeContainer}>
          {/* third component */}
          <div style={{ marginTop: "96px", marginBottom: "96px" }}>
            <p className={Styles.missionHeading}>
              Making your Diwali unforgettable is our mission.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className={Styles.missinSubHeading}>
                Browse our amazing collection, pick your favorites, and get
                ready to dazzle. Have a doubt? We're just a call away.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "19px",
                flexWrap: "wrap",
              }}
            >
              {missionData.map((card) => (
                <div key={card.id} className={Styles.missionCard}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image src={card.image} alt="Card Image" />
                  </div>
                  <p className={Styles.missionCardTitle}>{card.title}</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p className={Styles.missionCardDesc}>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* fourth component */}
          <div style={{ marginBottom: "96px" }}>
            <p className={Styles.reviewHeading}>Customer Reviews</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {reviewData.map((review) => (
                <div key={review.id} className={Styles.reviewCard}>
                  <span className={Styles.reviewCardQuote}>“</span>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p className={Styles.reviewCardDesc}>
                      {review.description}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "34px",
                    }}
                  >
                    <Image src={start} alt="genuine" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Image src={review.image} alt={review.name} />
                    <span className={Styles.reviewCardName}>{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* fifth component */}
          <div style={{ marginBottom: "96px" }}>
            <p className={Styles.faq}>FAQ</p>
            <AccordianComponent slides={accordian} />
          </div>
        </div>
      </div>
      {/* sixth component */}

      <Footer />
    </>
  );
};

export default homePage;
