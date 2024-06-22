import React, { useEffect, useState } from 'react';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Link } from 'react-scroll';

const CAROUSEL_DATA = [
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/summer.avif?alt=media&token=37fc320b-09f0-402a-ad37-3e434ddb7801',
    title: 'summer sale',
    description: "don't compromise on style! get flat 30% off for new arrivals."
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/pink.avif?alt=media&token=af57dc9b-5613-4538-845e-f79ce7d86eee',
    title: 'winter sale',
    description: "Winter is coming! don't miss out on our new collection!"
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/blue.avif?alt=media&token=62585a3e-c17f-4358-b31e-384faaa83550',
    title: 'Special sale',
    description: ' Just for you! Get flat 50% off for new arrivals.'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/yellow.avif?alt=media&token=ef6bbac1-219c-4d62-9119-58499cdba86f',
    title: 'autumn sale',
    description: "Get ready! Coming up with new arrivals, don't miss out on our new collection!"
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const incrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return (currentIndex + 1) % CAROUSEL_DATA.length;
    });
  };

  const decrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return currentIndex === 0 ? CAROUSEL_DATA.length - 1 : currentIndex - 1;
    });
  };
  useEffect(() => {
    const autoScrollInterval = setInterval(incrementIndex, 10000);

    return () => clearInterval(autoScrollInterval);
  }, []);
  return (
    <section className='h-carousel relative bg-red-300'>
      <div
        onClick={decrementIndex}
        className='w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 left-4 cursor-pointer'
      >
        <ArrowLeft className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
      </div>
      <img
        loading='lazy'
        src={CAROUSEL_DATA[currentIndex].url}
        className='w-full h-full object-cover transition-all duration-500 ease-out '
      />
      <div className='absolute h-full w-full top-0 left-0 bg-black/50'></div>
      <div className='absolute h-full w-full top-0 left-0 flex flex-col justify-center items-center text-white uppercase px-4 text-center'>
        <h1 className='text-4xl md:text-6xl leading-snug  font-bold mb-8'>{CAROUSEL_DATA[currentIndex].title}</h1>
        <p className='tracking-wider mb-16 text-md md:text-xl'>{CAROUSEL_DATA[currentIndex].description}</p>
        <Link to='categories' spy={true} smooth={true} offset={50} duration={500}>
          <button className='border p-3 bg-white text-black text-lg hover:bg-teal-600 hover:border-none hover:text-white transition ease-out	duration-500'>
            Shop Now <ArrowRight />
          </button>
        </Link>
      </div>
      <div
        onClick={incrementIndex}
        className='w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 right-4 cursor-pointer'
      >
        <ArrowRight className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
      </div>
    </section>
  );
};

export default Carousel;
