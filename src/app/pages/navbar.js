"use client";
import Link from "next/link";
import crackerKing from "../assets/CrackerKing.svg";
import cart from "../assets/cart.svg";
import Styles from "../styles/Navbar.module.css";
import Image from "next/image";
import download from "../assets/download.svg";
import menuIcon from "../assets/menuBar.svg";
import ShopKart from "../ShopKart";
import { useEffect, useState } from "react";
import { usePrevious } from "../helper";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = ({ fireData = [] }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mobileNavBar, setMobileNavBar] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const storedArrayString = sessionStorage.getItem("cartCount") || 0;
    setCount(storedArrayString);
  }, [fireData]);

  const fetchPDF = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://crackerskingsassets.s3.ap-south-1.amazonaws.com/" +
            "CRCKERS+KING+2024.pdf",
          { responseType: "blob" }
        )
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  };

  const handleDownload = async () => {
    const response = await fetchPDF();
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", "Price List Crackers King.pdf"); // Specify the file name for download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    link.remove(); // Clean up the link
  };
  return (
    <>
      <nav className={Styles.navbar}>
        <div className={Styles.navBarDesign}>
          <Image src={crackerKing} onClick={() => router.push("/")} />
          <div className={Styles.navBarLinksContainer}>
            <Link href="/">
              <span className={Styles.navBarLinks}>Home</span>
            </Link>
            <Link href="/shop">
              <span className={Styles.navBarLinks}>Shop</span>
            </Link>
            <Link href="/contactUs">
              <span className={Styles.navBarLinks}>Contact</span>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              className={Styles.NavContactBtn}
              style={{ cursor: "pointer" }}
              onClick={handleDownload}
            >
              <Image src={download} />
              Price List
            </button>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image
                src={cart}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              />
              {count > 0 && <span className={Styles.cartCount}>{count}</span>}
            </div>
            <Image
              src={menuIcon}
              className={Styles.menuIcon}
              onClick={() => setMobileNavBar(!mobileNavBar)}
            />
          </div>
        </div>
      </nav>
      {mobileNavBar && (
        <div className={Styles.overlay}>
          <div className={Styles.navBarLinksTable}>
            <div className={Styles.closeIcon}>
              <span onClick={() => setMobileNavBar(!mobileNavBar)}>
                &times;
              </span>
            </div>
            <div
              style={{ padding: "0px 40px 40px 40px" }}
              className={Styles.mobileNavBarLinks}
            >
              <Link href="/">
                <p className={Styles.navBarLinks}>Home</p>
              </Link>
              <Link href="/shop">
                <p className={Styles.navBarLinks}>Shop</p>
              </Link>
              <Link href="/contactUs">
                <p className={Styles.navBarLinks}>Contact</p>
              </Link>
              <button
                className={Styles.NavContactBtnMobile}
                style={{ cursor: "pointer" }}
              >
                <Image src={download} />
                Price List
              </button>
            </div>
          </div>
        </div>
      )}
      {open && <ShopKart open={open} setOpen={setOpen} setCount={setCount} />}
    </>
  );
};

export default Navbar;
