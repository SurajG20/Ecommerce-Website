import { useParams } from "react-router-dom";

import Products from "../components/Products";
import Layout from "../components/Layout";

const ShoppingCategorie = () => {
  const { category } = useParams();

  return (
    <Layout>
      <h1 className='p-8 font-bold text-4xl'>{`${category.charAt(0).toUpperCase()}${category.slice(1)}`}</h1>
      <Products category={category} />
    </Layout>
  );
};

export default ShoppingCategorie;
