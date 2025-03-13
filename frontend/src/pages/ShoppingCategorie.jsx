import { useParams } from "react-router-dom";

import Products from "../components/Products";
import Title from "../components/Title";
import Layout from "../components/Layout";

const ShoppingCategorie = () => {
  const { category } = useParams();

  return (
    <Layout>
      <Title>{`${category.charAt(0).toUpperCase()}${category.slice(1)}`}</Title>
      <Products category={category} />
    </Layout>
  );
};

export default ShoppingCategorie;
