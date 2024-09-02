"use client";
import React, { useEffect, useState } from "react";
import Styles from "../styles/shop.module.css";
import add from "../assets/counterAdd.svg";
import minus from "../assets/counterMinus.svg";
import Image from "next/image";
import { CRACKER_DATA } from "../cosntant";
import Navbar from "../pages/navbar";
import Footer from "../pages/Footer";
import Dropdown from "../pages/dropdown";
import Autocomplete from "../pages/AutoComplete";
import { usePrevious } from "../helper";
import Banner from "../pages/banner";
// Example Slide Components

const Shop = () => {
  const [fireData, setFirerData] = useState(CRACKER_DATA || []);
  const [shopKart, setShopKart] = useState([]);
  const [option, setOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
  const [inputValue, setInputValue] = useState("");
  const prevInputValue = usePrevious(inputValue);

  useEffect(() => {
    if (prevInputValue !== inputValue && inputValue !== "") {
      const filteredVal = fireData.map((item) => {
        return {
          ...item,
          sparklersData: item?.sparklersData.filter(
            (item) => item.title === inputValue
          ),
        };
      });
      setFirerData(filteredVal);
    } else if (inputValue === "" && prevInputValue !== inputValue) {
      setFirerData(CRACKER_DATA);
    }
  }, [inputValue]);

  const suggestions = [
    "flowerSpot1",
    "flowerSpot5",
    "flowerSpot2",
    "flowerSpot3",
    "flowerSpot4",
    "Bomb1",
    "Bomb2",
    "Bomb3",
    "Bomb4",
    "Bomb6",
    "Bomb5",
    "Bomb7",
  ];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const options = [
    "flowerSpot",
    "Bomb",
    "Shot",
    "forChildren",
    "newArrivals",
    "fancyItems",
    "bestSellers",
  ];

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
    const arrayString = JSON.stringify(checkoutData);
    sessionStorage.setItem("cartData", arrayString);
    // console.log(checkoutData, "dataVal");
    setShopKart(checkoutData);
  };

  const handleSelect = (data) => {
    setOption(data);
    if (data === "") {
      setFirerData(CRACKER_DATA);
    } else if (
      ["forChildren", "newArrivals", "fancyItems", "bestSellers"].includes(data)
    ) {
      const filteredVal = fireData.map((item) => {
        return {
          ...item,
          sparklersData: item?.sparklersData.filter(
            (item) => item.type === data
          ),
        };
      });
      setFirerData(filteredVal);
    } else {
      document.getElementById(data).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar fireData={shopKart} />
      <Banner
        backgroundImage={"../assets/bgShop.jpeg"}
        headerText="Shop Now! For Unforgettable"
        subheaderText="Fireworks"
        buttonText="Contact Us"
        mobileBackgroundImage={"/mobileShopBg.png"}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#1E1E1E",
        }}
      >
        <div className={Styles.homeContainer}>
          {fireData?.length > 0 &&
            fireData?.map(({ title, sparklersData, id }, index) => {
              return (
                <div
                  style={{
                    paddingBottom: "30px",
                    borderBottom: "1px solid #4C4639;",
                    marginBottom: "50px",
                  }}
                >
                  <div
                    id={title}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      style={
                        index === 0
                          ? {
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "50px",
                              width: "100%",
                            }
                          : {
                              marginBottom: "50px",
                              width: "100%",
                            }
                      }
                      className={Styles.experienceContainer}
                    >
                      <span className={Styles.experienceTitle}>{title}</span>
                      {index === 0 && (
                        <div className={Styles.experienceFilterContainer}>
                          <Dropdown
                            options={options}
                            label="Filter"
                            handleSelect={handleSelect}
                            value={option}
                            setOption={setOption}
                          />
                          <Autocomplete
                            suggestions={suggestions}
                            value={inputValue}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "67px",
                      flexWrap: "wrap",
                      maxWidth: "1076px",
                      width: "100%",
                    }}
                  >
                    {/* card component start here */}
                    {sparklersData?.map((sparkler) => (
                      <div key={sparkler.id} className={Styles.card}>
                        <div className={Styles.cardImageBackground}>
                          <div
                            style={backgroundImageStyle(sparkler?.image)}
                          ></div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "12px",
                            alignItems: "center",
                            marginBottom: "12px",
                          }}
                        >
                          <span className={Styles.cardTitle}>
                            {sparkler?.title}
                          </span>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <p className={Styles.offerPrice}>
                              {sparkler?.offerPrice}
                            </p>
                            <span className={Styles.cardPrice}>
                              {sparkler?.cardPrice}
                            </span>
                          </div>
                        </div>
                        <span className={Styles.cardSize}>
                          {sparkler?.size}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className={Styles.cardQuantity}
                            style={
                              sparkler.count === 0
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                          >
                            <Image
                              src={minus}
                              alt="minus"
                              onClick={() =>
                                handleCardClick(
                                  id,
                                  sparkler.key,
                                  "count",
                                  sparkler.count,
                                  "minus"
                                )
                              }
                            />
                            <span>{sparkler?.count}</span>
                            <Image
                              src={add}
                              alt="add"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleCardClick(
                                  id,
                                  sparkler.key,
                                  "count",
                                  sparkler.count,
                                  "add"
                                )
                              }
                            />
                          </div>
                          <span
                            className={Styles.cardSelect}
                            onClick={() =>
                              handleCardClick(
                                id,
                                sparkler.key,
                                "Selection",
                                sparkler.Selection,
                                ""
                              )
                            }
                          >
                            {sparkler?.Selection ? "Unselect" : "Select"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* card component end here */}
                </div>
              );
            })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
