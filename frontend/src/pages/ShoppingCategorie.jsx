import React, { useState } from "react";

import { useParams } from "react-router-dom";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Title from "../components/Title";

const ShoppingCategorie = () => {
  const { category } = useParams();

  return (
    <>
      <Announcement />
      <Navbar />
      <Title>{`${category.charAt(0).toUpperCase()}${category.slice(1)}`}</Title>
      <Products category={category} />
      <Footer />
    </>
  );
};

export default ShoppingCategorie;
