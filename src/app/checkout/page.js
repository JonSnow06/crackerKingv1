"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "../styles/checkout.module.css";
import InputField from "../pages/input";
import Image from "next/image";
import Footer from "../pages/Footer";
import Navbar from "../pages/navbar";
import Popup from "../pages/popup"; // Import the Popup component
import Banner from "../pages/banner";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [shopKartData, setShopKartData] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      // Only run this code when the component is mounted on the client-side
      const storedArrayString = sessionStorage.getItem("shopKartData") || "[]";
      if (storedArrayString) {
        try {
          const storedArray = JSON.parse(storedArrayString);

          if (Array.isArray(storedArray.shopKartData)) {
            setShopKartData(storedArray.shopKartData);
          } else {
            console.error("Stored data is not an array", storedArray);
          }
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    }
  }, [hasMounted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && value.length <= 10) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "pincode" && value.length <= 6) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name !== "phoneNumber" && name !== "pincode") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const sendEmail = (totalOfferPrice, shopKartData) => {
    fetch("http://localhost:5000/users", {
      method: "POST", // Change the method to POST
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        // Add the data you want to send
        totalOfferPrice,
        shopKartData,
        formData,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data)) // Handle the response data
      .catch((error) => console.error("Error:", error)); // Handle any errors
  };

  const handleSubmit = () => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      setPopupMessage("Please fill in all the fields.");
    } else {
      setPopupMessage("Your order has been submitted.");
      sendEmail(totalOfferPrice, shopKartData);
      const data = shopKartData.map((item) => {
        return {
          ...item,
          count: 0,
          Selection: false,
        };
      });
      sessionStorage.setItem("shopKartData", JSON.stringify(data));
      sessionStorage.setItem("cartData", JSON.stringify(data));
      sessionStorage.setItem("cartCount", 0);
    }
    // setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupMessage === "Your order has been submitted.") {
      router.push("/shop");
      setFormData({
        name: "",
        emailId: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "",
      });
    }
  };

  const totalOfferPrice = shopKartData.reduce(
    (sum, item) => sum + parseFloat(item.totalPrice.replace("₹", "")),
    0
  );
  const totalCardPrice = shopKartData.reduce(
    (sum, item) => sum + parseFloat(item.totalCardPrice.replace("₹", "")),
    0
  );

  return (
    <>
      <Navbar />
      <Banner
        backgroundImage={
          "https://crackerskingsassets.s3.ap-south-1.amazonaws.com/checkout_banner.png"
        }
        headerText="Enjoy Diwali’s Sale! "
        subheaderText="Cracker’s King"
        mobileBackgroundImage={
          "https://crackerskingsassets.s3.ap-south-1.amazonaws.com/checkout_mobile_banner.svg"
        }
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#1E1E1E",
          paddingTop: "50px",
        }}
      >
        <div className={Styles.CheckoutContainer}>
          <div className={Styles.CheckOutDetailsWrapper}>
            <p className={Styles.CheckOutDetailsHeader}>Booking Details</p>
            <br />
            <InputField
              label="Name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              type="text"
            />
            <InputField
              label="Mail ID"
              type="email"
              name="emailId"
              onChange={handleChange}
              value={formData.emailId}
            />
            <InputField
              label="Phone Number"
              type="number"
              maxLength="10"
              required
              name="phoneNumber"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
            <InputField
              label="Address 1"
              name="address1"
              onChange={handleChange}
              value={formData.address1}
            />
            <InputField
              label="Address 2"
              name="address2"
              onChange={handleChange}
              value={formData.address2}
            />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                gap: "10px",
              }}
              className={Styles.CheckOutCityPincode}
            >
              <InputField
                label="City"
                width="211px"
                name="city"
                onChange={handleChange}
                value={formData.city}
              />
              <InputField
                label="pincode"
                type="number"
                width="211px"
                pattern="[1-9]{1}[0-9]{5}"
                name="pincode"
                onChange={handleChange}
                value={formData.pincode}
              />
            </div>

            <InputField
              label="State"
              name="state"
              width="50%"
              onChange={handleChange}
              value={formData.state}
            />
            <button
              className={Styles.ContactBtn}
              onClick={handleSubmit}
              style={{ cursor: "pointer" }}
            >
              Submit Order
            </button>
          </div>
          <div className={Styles.CheckOutOrderWrapper}>
            <p className={Styles.CheckOutOrderHeader}>Order List</p>
            <div className={Styles.checkoutKartWrapper}>
              {shopKartData.map((item) => (
                <div key={item.id} className={Styles.checkouKartCard}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                  <div>
                    <span className={Styles.checkoutCardTitle}>
                      {item.title}
                    </span>
                    <br />
                    <span className={Styles.checkoutCardSubTitle}>
                      {item.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span className={Styles.checkoutCardSubTitlePrice}>
                Net Total
              </span>
              <span className={Styles.checkoutCardSubTitlePrice}>
                ₹ {totalCardPrice}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "inherit",
                fontSize: "18px",
              }}
            >
              <span
                className={Styles.checkoutCardSubTitlePrice}
                style={{ fontWeight: "inherit", fontSize: "18px" }}
              >
                Grand Total(After Discount)
              </span>
              <span
                className={Styles.checkoutCardSubTitlePrice}
                style={{ fontWeight: "inherit", fontSize: "18px" }}
              >
                ₹ {totalOfferPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
      <Footer />
    </>
  );
};

export default Checkout;
