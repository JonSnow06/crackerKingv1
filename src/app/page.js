"use client";
import dynamic from "next/dynamic";

// Dynamically import CarouselComponent with SSR disabled

const HomePage = dynamic(() => import("./pages/index"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
