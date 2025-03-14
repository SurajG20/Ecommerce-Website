import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "clothes",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/clothes.avif?alt=media&token=0b2171d9-2053-42cf-80b8-2a1188df148c",
    label: "Clothes"
  },
  {
    name: "women",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/women.avif?alt=media&token=17fda597-2e27-4752-853f-a97195b3bee8",
    label: "Women"
  },
  {
    name: "men",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/men.avif?alt=media&token=c54d2b65-3f32-4189-8335-b9bb3a2a6ae2",
    label: "Men"
  },
  {
    name: "shoes",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/shoes.avif?alt=media&token=4758c7eb-2f1a-478a-9a4f-e49666ac08fd",
    label: "Shoes"
  },
  {
    name: "electronics",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/electronics.avif?alt=media&token=5dbce477-6ca1-496a-93a0-cc955c73032c",
    label: "Electronics"
  },
  {
    name: "others",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/others.avif?alt=media&token=63fdba67-74e0-40e6-bf22-9a7990ec4ebf",
    label: "Others"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 bg-gray-50" id="categories">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              onClick={() => navigate(`/categories/${category.name}`)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-2xl font-semibold capitalize">
                      {category.label}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
