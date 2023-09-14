import React, { useEffect, useState } from "react";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Link } from "react-scroll";

const CAROUSEL_DATA = [
  {
    url: "https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "summer sale",
    description:
      "don't compromise on style! get flat 30% off for new arrivals.",
  },
  {
    url: "https://images.unsplash.com/photo-1575939238474-c8ada13b2724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "winter sale",
    description: "Winter is coming! don't miss out on our new collection!",
  },
  {
    url: "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Special sale",
    description: " Just for you! Get flat 50% off for new arrivals.",
  },
  {
    url: "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "autumn sale",
    description:
      "Get ready! Coming up with new arrivals, don't miss out on our new collection!",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const incrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return (currentIndex + 1) % CAROUSEL_DATA.length;
    });
  };

  const decrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return currentIndex === 0 ? CAROUSEL_DATA.length - 1 : currentIndex - 1;
    });
  };
  useEffect(() => {
    const autoScrollInterval = setInterval(incrementIndex, 10000);

    return () => clearInterval(autoScrollInterval);
  }, []);
  return (
    <section className="h-carousel relative bg-red-300">
      <div
        onClick={decrementIndex}
        className="w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 left-4 cursor-pointer"
      >
        <ArrowLeft className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
      <img
        src={CAROUSEL_DATA[currentIndex].url}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out"
      />
      <div className="absolute h-full w-full top-0 left-0 bg-black/30"></div>
      <div className="absolute h-full w-full top-0 left-0 flex flex-col justify-center items-center text-white uppercase px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          {CAROUSEL_DATA[currentIndex].title}
        </h1>
        <p className="tracking-wider mb-16 text-md md:text-xl">
          {CAROUSEL_DATA[currentIndex].description}
        </p>
        <Link
          to="categories"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          <button className="border p-3 bg-white text-black text-lg hover:bg-teal-600 hover:border-none hover:text-white transition ease-out	duration-500">
            Shop Now <ArrowRight />
          </button>
        </Link>
      </div>
      <div
        onClick={incrementIndex}
        className="w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 right-4 cursor-pointer"
      >
        <ArrowRight className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
};

export default Carousel;
