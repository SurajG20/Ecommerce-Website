import React from 'react';

import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <Carousel />
      <Categories />
      <Products />
    </Layout>
  );
};

export default Home;
