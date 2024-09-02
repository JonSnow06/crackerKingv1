"use client";
import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// Example Slide Components

const CarouselComponent = ({ slides }) => {
  return (
    <div>
      <ResponsiveCarousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={2000} // Adjust the interval time (in milliseconds) as needed
        // dynamicHeight
        // emulateTouch
        transitionTime={500} // A
        renderIndicator={false}
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
