import React from "react";

import Categorie from "./Categorie";

const Categories = () => {
  return (
    <section className="p-8" id="categories">
      <div className="grid gap-2 md:grid-cols-3 mb-2">
        <Categorie
          name="Clothes"
          image="https://images.unsplash.com/photo-1542060748-10c28b62716f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        />
        <Categorie
          name="Shoes"
          image="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        />
        <Categorie
          name="Electronics"
          image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1802&q=80"
        />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <Categorie
          name="Furniture"
          image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
        />
        <Categorie
          name="Others"
          image="https://images.unsplash.com/photo-1635447272203-92e6fdf27245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
        />
      </div>
    </section>
  );
};

export default Categories;
