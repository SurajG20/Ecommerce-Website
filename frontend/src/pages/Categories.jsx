import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const categories = [
  {
    name: "clothes",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/clothes.avif?alt=media&token=0b2171d9-2053-42cf-80b8-2a1188df148c",
    label: "Clothes",
    description: "Discover the latest fashion trends"
  },
  {
    name: "women",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/women.avif?alt=media&token=17fda597-2e27-4752-853f-a97195b3bee8",
    label: "Women",
    description: "Stylish collection for women"
  },
  {
    name: "men",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/men.avif?alt=media&token=c54d2b65-3f32-4189-8335-b9bb3a2a6ae2",
    label: "Men",
    description: "Contemporary men's fashion"
  },
  {
    name: "shoes",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/shoes.avif?alt=media&token=4758c7eb-2f1a-478a-9a4f-e49666ac08fd",
    label: "Shoes",
    description: "Footwear for every occasion"
  },
  {
    name: "electronics",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/electronics.avif?alt=media&token=5dbce477-6ca1-496a-93a0-cc955c73032c",
    label: "Electronics",
    description: "Latest tech and gadgets"
  },
  {
    name: "others",
    image: "https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/others.avif?alt=media&token=63fdba67-74e0-40e6-bf22-9a7990ec4ebf",
    label: "Others",
    description: "Explore more categories"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Categories</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of products across various categories. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              onClick={() => navigate(`/categories/${category.name}`)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent via-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex flex-col items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-primary-foreground text-3xl font-bold capitalize mb-2">
                        {category.label}
                      </h3>
                      <div className="w-12 h-1 bg-primary-foreground rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      <p className="text-primary-foreground/90 mt-4 text-sm font-medium px-4 text-center">
                        {category.description}
                      </p>
                      <p className="text-primary-foreground/90 mt-2 text-sm font-medium">
                        Explore Collection →
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
