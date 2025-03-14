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
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-md">
              <div className="flex rounded-lg shadow-sm bg-card border border-border" role="group">
                <button
                  type="button"
                  onClick={() => setIndex(0)}
                  className={`flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium gap-2 rounded-l-lg transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Products
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(1)}
                  className={`flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium gap-2 rounded-r-lg transition-colors ${
                    index === 1
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <PlusCircle className="h-5 w-5" />
                  Add Product
                </button>
              </div>
            </div>
            <div className="w-full">
              {index === 0 ? <ProductList /> : <AddProduct />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
