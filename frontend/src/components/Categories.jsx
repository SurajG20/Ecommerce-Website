import React from "react";

import Categorie from "./Categorie";

const Categories = () => {
  return (
    <section className="p-4" id="categories">
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 mb-2">
        <Categorie
          name="clothes"
          image="https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/clothes.avif?alt=media&token=0b2171d9-2053-42cf-80b8-2a1188df148c"
        />
        <Categorie
          name="women"
          image="https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/women.avif?alt=media&token=17fda597-2e27-4752-853f-a97195b3bee8"
        />
        <Categorie
          name="men"
          image="https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/men.avif?alt=media&token=c54d2b65-3f32-4189-8335-b9bb3a2a6ae2"
        />
        <Categorie
          name="shoes"
          image="https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/shoes.avif?alt=media&token=4758c7eb-2f1a-478a-9a4f-e49666ac08fd"
        />
        <Categorie
          name="electronics"
          image="https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/electronics.avif?alt=media&token=5dbce477-6ca1-496a-93a0-cc955c73032c"
        />

        <Categorie
          name="others"
          image="https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/others.avif?alt=media&token=63fdba67-74e0-40e6-bf22-9a7990ec4ebf"
        />
      </div>
    </section>
  );
};

export default Categories;
