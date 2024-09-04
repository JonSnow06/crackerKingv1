"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const storedArrayString = sessionStorage.getItem("shopKartData");
    if (storedArrayString) {
      try {
        // Parse the JSON string back into an array of objects
        const storedArray = JSON.parse(storedArrayString);

        // Ensure the parsed data is an array before setting it to state
        if (Array.isArray(storedArray.shopKartData)) {
          setShopKartData(storedArray.shopKartData);
        } else {
          console.error("Stored data is not an array", storedArray);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
  }, []);

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

  const handleSubmit = () => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );

    if (!allFieldsFilled) {
      setPopupMessage("Please fill in all the fields.");
    } else {
      setPopupMessage("Your order has been submitted.");
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />
      <Banner
        backgroundImage={"/checkoutBg.jpeg"}
        headerText="Enjoy Diwali’s Sale! "
        subheaderText="Cracker’s King"
        mobileBackgroundImage={"/mobileCheckOutBg.png"}
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
              pattern="[6-9]{1}[0-9]{9}"
              type="tel"
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
                type="text"
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
            <button className={Styles.ContactBtn} onClick={handleSubmit}>
              Submit Order
            </button>
          </div>
          <div className={Styles.CheckOutOrderWrapper}>
            <p className={Styles.CheckOutOrderHeader}>Order List</p>
            <div className={Styles.checkoutKartWrapper}>
              {shopKartData.map((item) => (
                <div key={item.id} className={Styles.checkouKartCard}>
                  <Image
                    src={item.imagePic}
                    alt={item.title}
                    style={{ width: "80px", height: "80px" }}
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
                justifyContent: "center",
                gap: "50px",
                marginBottom: "10px",
              }}
            >
              <span className={Styles.checkoutCardSubTitlePrice}>
                Net Total
              </span>
              <span className={Styles.checkoutCardSubTitlePrice}>
                ₹26000.00
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
                marginBottom: "10px",
              }}
            >
              <span className={Styles.checkoutCardSubTitlePrice}>Discount</span>
              <span className={Styles.checkoutCardSubTitlePrice}>
                ₹26000.00
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              <span className={Styles.checkoutCardSubTitlePrice}>
                Sub Total
              </span>
              <span className={Styles.checkoutCardSubTitlePrice}>
                ₹26000.00
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
