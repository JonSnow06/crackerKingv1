"use client";
import crackerKing from "../assets/CrackerKing.svg";
import Styles from "../styles/footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      style={{
        background: " #1E1E1E",
        paddingBottom: "60px",
        paddingTop: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={Styles.footerContainer}>
          <div style={{ maxWidth: "309px", width: "100%" }}>
            <div className={Styles.footerLogo}>
              <Image src={crackerKing} style={{ marginBottom: "20px" }} />
            </div>
            <p className={Styles.footerText}>
              1/1468 V1,Jeyarathinam nagar, Viswanatham road sivakasi.626123
              tamilnadu
            </p>
            <p className={Styles.footerText}>
              +91 88077 75335, +91 93601 97778
            </p>
          </div>

          <div style={{ maxWidth: "59px", width: "100%" }}>
            <p className={Styles.footerNav}>Home</p>

            <p className={Styles.footerNav}>About</p>

            <p className={Styles.footerNav}>Shop</p>

            <p className={Styles.footerNav}>Contact</p>
          </div>
          <div style={{ maxWidth: "161px", width: "100%" }}>
            <p className={Styles.footerNav}>Privacy Policy</p>
            <p className={Styles.footerNav}>Terms of Use</p>
          </div>
        </div>
      </div>
      <p className={Styles.footerCopyRight}>
        Copyrights - 2024 Cracker’s King | All Rights reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
