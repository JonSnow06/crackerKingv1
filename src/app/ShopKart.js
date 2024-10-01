"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./styles/ShopKart.module.css";
import add from "./assets/counterAdd.svg";
import minus from "./assets/counterMinus.svg";
import deletes from "./assets/delete.svg";
import Image from "next/image";

function ShopKart({ setOpen, open, setCount }) {
  const router = useRouter();
  const [shopKartData, setShopKartData] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const storedArrayString = sessionStorage.getItem("cartData");
    if (storedArrayString) {
      try {
        const storedArray = JSON.parse(storedArrayString);
        const totalCountValue = storedArray.map((item) => ({
          ...item,
          totalPrice: (
            parseFloat(item.offerPrice.replace("₹", "")) * item.count
          ).toFixed(2),
          totalCardPrice: (
            parseFloat(item.cardPrice.replace("₹", "")) * item.count
          ).toFixed(2),
        }));
        setShopKartData(totalCountValue || []);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
  }, [hasMounted]);

  const removeData = (id) => {
    const data = shopKartData.filter((item) => item.key !== id);
    setCount(data.length);
    setShopKartData(data);
    sessionStorage.setItem("cartData", JSON.stringify(data));
    sessionStorage.setItem("cartCount", data.length);
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

  const totalOfferPrice = shopKartData.reduce(
    (sum, item) => sum + parseFloat(item.totalPrice.replace("₹", "")),
    0
  );
  const totalCardPrice = shopKartData.reduce(
    (sum, item) => sum + parseFloat(item.totalCardPrice.replace("₹", "")),
    0
  );
  console.log(totalCardPrice, totalOfferPrice, shopKartData, "king");
  return (
    <div className={Styles.shopKartContainer}>
      <div className={Styles.shopModalWrapper}>
        <span className={Styles.closeIcon} onClick={() => setOpen(!open)}>
          &times;
        </span>
        <div
          style={
            shopKartData.length === 0
              ? {
                  maxWidth: "595px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : { maxWidth: "595px", width: "100%" }
          }
        >
          {shopKartData.length === 0 ? (
            "Yet No item Added in a Cart"
          ) : (
            <>
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
                      <span className={Styles.cardPrice}>
                        {item.totalPrice}
                      </span>
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
                  <span className={Styles.shopkartCardPriceKey}>
                    ₹ {totalCardPrice}
                  </span>
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
                  <span
                    className={Styles.shopkartCardPriceKey}
                    style={{ fontWeight: "inherit", fontSize: "18px" }}
                  >
                    Grand Total(After Discount)
                  </span>
                  <span
                    className={Styles.shopkartCardPriceKey}
                    style={{ fontWeight: "inherit", fontSize: "18px" }}
                  >
                    ₹{totalOfferPrice}
                  </span>
                </div>
              </div>
              <button
                className={Styles.ContactBtn}
                onClick={() => navigate()}
                style={{ cursor: "pointer" }}
              >
                Confirm Estimation
              </button>
            </>
          )}
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
