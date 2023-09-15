import React from "react";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Carousel />
      <Categories />
      <Products />
      <Footer />
    </>
  );
};

export default Home;
