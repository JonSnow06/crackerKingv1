"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./styles/ShopKart.module.css";
import add from "./assets/counterAdd.svg";
import minus from "./assets/counterMinus.svg";
import deletes from "./assets/delete.svg";
import Image from "next/image";

function ShopKart({ setOpen, open, fireData }) {
  const router = useRouter();
  const [shopKartData, setShopKartData] = useState([]);

  useEffect(() => {
    const storedArrayString = sessionStorage.getItem("cartData");
    if (storedArrayString) {
      try {
        // Parse the JSON string back into an array of objects
        const storedArray = JSON.parse(storedArrayString);
        setShopKartData(storedArray);
        console.log(storedArray, ";;;"); // [{ key: "apple" }, { key: "banana" }, { key: "cherry" }]
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
  }, []);

  const removeData = (id) => {
    const data = shopKartData.filter((item) => item.key !== id);
    setShopKartData(data);
  };

  const navigate = () => {
    sessionStorage.setItem(
      "shopKartData",
      JSON.stringify({
        shopKartData,
      })
    );
    router.push("/checkout");
  };
  return (
    <div className={Styles.shopKartContainer}>
      <div className={Styles.shopModalWrapper}>
        <span className={Styles.closeIcon} onClick={() => setOpen(!open)}>
          &times;
        </span>
        <div style={{ maxWidth: "595px", width: "100%" }}>
          <div className={Styles.shopKartWrapper}>
            {shopKartData.map((item) => (
              <div key={item.key} className={Styles.shopKartCard}>
                <Image
                  src={item.imagePic}
                  alt={item.title}
                  style={{ width: "80px", height: "80px" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div>
                    <span className={Styles.shopkartCardTitle}>
                      {item.title}
                    </span>
                    <br />
                    <span className={Styles.shopkartCardSubTitle}>
                      {item.size}
                    </span>
                  </div>
                  <div className={Styles.cardQuantity}>
                    <Image src={minus} alt="minus" />
                    <span>{item.count}</span>
                    <Image src={add} alt="add" />
                  </div>
                  <span className={Styles.cardPrice}>{item.cardPrice}</span>
                  <Image
                    src={deletes}
                    alt="delete"
                    onClick={() => removeData(item.key)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              maxWidth: "595px",
              width: "100%",
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <div className={Styles.shopKartCardPrice}>
              <span className={Styles.shopkartCardPriceKey}>Net Total</span>
              <span className={Styles.shopkartCardPriceKey}>₹ 499</span>
            </div>
          </div>
          <div
            style={{
              maxWidth: "595px",
              width: "100%",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className={Styles.shopKartCardPrice}>
              <span className={Styles.shopkartCardPriceKey}>Discount</span>
              <span className={Styles.shopkartCardPriceKey}>₹ 499</span>
            </div>
          </div>
          <div
            style={{
              maxWidth: "595px",
              width: "100%",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className={Styles.shopKartCardPrice}>
              <span className={Styles.shopkartCardPriceKey}>Sub Total</span>
              <span className={Styles.shopkartCardPriceKey}>₹ 499</span>
            </div>
          </div>
          <button className={Styles.ContactBtn} onClick={() => navigate()}>
            Confirm Estimation
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "409px",
            width: "100%",
          }}
        >
          <div className={Styles.minimunPrice}>
            <p className={Styles.minimunPriceKey}>Min. Order Amount</p>
            <div className={Styles.minimunPriceValue}>
              <span>Tamil Nadu</span>
              <span>₹3000</span>
            </div>
            <div className={Styles.minimunPriceValue}>
              <span>Tamil Nadu</span>
              <span>₹3000</span>
            </div>
            <div className={Styles.minimunPriceValue}>
              <span>Tamil Nadu</span>
              <span>₹3000</span>
            </div>
            <div className={Styles.minimunPriceValue}>
              <span>Tamil Nadu</span>
              <span>₹3000</span>
            </div>
            <div className={Styles.minimunPriceValue}>
              <span>Tamil Nadu</span>
              <span>₹3000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopKart;
