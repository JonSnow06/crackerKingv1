import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "../styles/multCarousal.module.css";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

const SwiperCarousel = ({ children }) => (
  //   <div className={Styles.swiperContainer}>
  <Swiper
    spaceBetween={30}
    slidesPerView={3}
    loop={true} // Enables infinite loop
    autoplay={{
      delay: 3000, // Time between slides in milliseconds
      disableOnInteraction: false, // Keeps autoplay running even after user interaction
    }}
    breakpoints={{
      360: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    }}
    navigation={false} // Disables arrows
    pagination={false} // Disables pagination dots
  >
    {children.map((child, index) => (
      <SwiperSlide
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        key={index}
      >
        {child}
      </SwiperSlide>
    ))}
  </Swiper>
  //   </div>
);

export default SwiperCarousel;
