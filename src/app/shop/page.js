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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Set hasMounted to true after the component mounts
    setHasMounted(true);
  }, []);

  const backgroundImageStyle = (imageUrl) => {
    return {
      backgroundImage: `url(${imageUrl})`,
      height: "250px", // Adjust as needed
      width: "250px", // Adjust as needed
    };
  };

  useEffect(() => {
    const filterData = sessionStorage.getItem("filterData");
    if (filterData) {
      handleSelect(filterData);
    }
  }, []);

  useEffect(() => {
    const storedArrayString = sessionStorage.getItem("cartData");
    if (storedArrayString) {
      try {
        const storedArray = JSON.parse(storedArrayString);
        fireData.forEach((category) => {
          category.sparklersData.forEach((sparkler) => {
            const matchingProduct = storedArray.find(
              (product) => product.title === sparkler.title
            );
            if (matchingProduct) {
              // Update the sparkler object with matching product data
              sparkler.Selection = matchingProduct.Selection;
              sparkler.count = matchingProduct.count;
            }
          });
        });

        setFirerData(fireData);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
  }, [hasMounted]);

  const options = [
    "Sparklers",
    "Flower Pots",
    "Ground Chakkers",
    "Novelties",
    "Single Sound",
    "Bombs",
    "Rockets",
    "Peacocks",
    "Colour Fancy",
    "Paper Bombs",
    "Fancy Item",
    "Night Boomers",
    "Multi Color Shots",
    "2K/24 Series",
    "Gift Boxes",
    "Kids special",
    "Best Sellers",
    "New arrivals",
    "Fancy Items",
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
    let dataCount = checkoutData.length;
    sessionStorage.setItem("cartCount", dataCount);
    setShopKart(checkoutData);
  };

  const handleSelect = (data) => {
    setOption(data);
    if (data === "") {
      const storedArrayString = sessionStorage.getItem("cartData") || "";
      if (storedArrayString !== "") {
        const storedArray = JSON.parse(storedArrayString);
        fireData.forEach((category) => {
          category.sparklersData.forEach((sparkler) => {
            const matchingProduct = storedArray.find(
              (product) => product.title === sparkler.title
            );

            if (matchingProduct) {
              sparkler.Selection = matchingProduct.Selection;
              sparkler.count = matchingProduct.count;
            }
          });
        });
        setFirerData(fireData);
      }
      setFirerData(CRACKER_DATA);
    } else if (
      ["Kids special", "Best Sellers", "New arrivals", "Fancy Items"].includes(
        data
      )
    ) {
      const filteredVal = fireData.map((item) => {
        return {
          ...item,
          sparklersData: item?.sparklersData.filter(
            (item) => item.type === data
          ),
        };
      });
      const valData = filteredVal.filter(
        ({ sparklersData }) => sparklersData.length > 0
      );
      setFirerData(valData);
      sessionStorage.setItem("filterData", "");
    } else {
      document.getElementById(data).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar fireData={shopKart} />
      <Banner
        backgroundImage={
          "https://crackerskingsassets.s3.ap-south-1.amazonaws.com/shop_Banner.png"
        }
        headerText="Shop Now! For Unforgettable"
        subheaderText="Fireworks"
        buttonText="shop Us"
        mobileBackgroundImage={
          "https://crackerskingsassets.s3.ap-south-1.amazonaws.com/shop_mobile_Banner.svg"
        }
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
                <>
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
                        <div
                          key={sparkler.id}
                          className={Styles.card}
                          style={
                            sparkler?.Selection
                              ? { border: "1px solid #E4C36C" }
                              : {}
                          }
                        >
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
                                {sparkler?.cardPrice}
                              </p>
                              <span className={Styles.cardPrice}>
                                {sparkler?.offerPrice}
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
                </>
              );
            })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
