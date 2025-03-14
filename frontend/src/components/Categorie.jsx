import React from 'react';
import { Link } from 'react-router-dom';

const Categorie = ({ name, image }) => {
  return (
    <Link to={`/categories/${name.toLowerCase()}`}>
      <figure className="relative h-72">
        <img
          src={image}
          alt={name}
          className="object-cover object-center overflow-hidden h-full w-full shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl"
        />
        <figcaption className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-2">
          <h2 className="mb-4 p-2 uppercase text-xl sm:text-2xl md:text-3xl text-primary-foreground font-bold text-center">
            {name}
          </h2>
          <button className="border p-2 bg-background text-foreground text-md md:text-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-500">
            Shop Now
          </button>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Categorie;
