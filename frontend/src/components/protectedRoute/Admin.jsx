import Announcements from "../Announcement";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Package, PlusCircle } from "lucide-react";
import ProductList from "./ProductsData";
import { useState } from "react";
import AddProduct from "./AddProduct";

const Admin = () => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Announcements />
      <Navbar />
      <div className="flex flex-col items-center min-h-screen py-4 mx-auto ">
        <div
          className="items-start flex rounded-md shadow-sm mx-auto "
          role="group"
        >
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg gap-2"
          >
            <Package size={20} /> PRODUCTS
          </button>

          <button
            type="button"
            onClick={() => setIndex(1)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md gap-2"
          >
            <PlusCircle size={20} />
            ADD
          </button>
        </div>
        {index === 0 ? <ProductList /> : <AddProduct />}
      </div>
      <Footer />
    </>
  );
};
export default Admin;
