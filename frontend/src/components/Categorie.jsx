import React from 'react';

import { Link } from 'react-router-dom';

const Categorie = ({ name, image }) => {
  return (
    <Link to={`/categories/${name.toLowerCase()}`}>
      <figure className='relative h-72'>
        <img
          src={image}
          alt={name}
          className='object-cover object-center overflow-hidden h-full w-full  shadow-lg transition ease-out duration-500 transform hover:scale-105 hover:shadow-xl'
        />
        <figcaption className=' bg-black/30 absolute z-100 top-0 left-0 w-full h-full flex flex-col justify-center items-center p-2'>
          <h2 className='mb-4 p-2 uppercase text-xl sm:text-2xl md:text-3xl text-white font-bold text-center'>
            {name}
          </h2>
          <button className='border p-2 bg-white text-black text-md md:text-lg hover:bg-teal-600 hover:border-none hover:text-white transition ease-out	duration-500'>
            Shop Now
          </button>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Categorie;
