"use client";
import React, { useEffect, useState } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = ({ slides }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ResponsiveCarousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        renderIndicator={false}
        interval={2000}
        transitionTime={500}
        swipeable={!isMobile} // Disable swipe on mobile
      >
        {slides.map((SlideComponent, index) => (
          <div key={index}>
            <SlideComponent />
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default CarouselComponent;
