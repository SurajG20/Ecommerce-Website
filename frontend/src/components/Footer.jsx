import React from 'react';

import logo from '../assets/logo.svg';
import { CiFacebook } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';

import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className='w-full mx-auto bg-gray-200 px-12 py-6'>
      <div className='flex flex-col justify-center items-center space-y-12'>
        <div className='mx-auto max-w-lg'>
          <h2 className='text-2xl sm:text-4xl text-left font-medium sm:text-center tracking-wide leading-normal'>
            Your One-Stop Shopping Destination
          </h2>
        </div>
        <div className='w-full flex mx-auto justify-center flex-col sm:flex-row items-start sm:items-center gap-y-6 gap-x-12'>
          <div>
            <button className='bg-teal-700 rounded-md shadow-lg px-8 py-3 text-center text-sm sm:text-lg font-medium text-white border border-white hover:bg-teal-500 cursor-pointer'>
              SUBSCRIBE FOR OFFERS
            </button>
          </div>
          <div>
            <button className='bg-white-700 rounded-md shadow-lg px-8 py-3 text-center text-sm sm:text-lg font-medium text-teal-700 border border-teal-700 hover:bg-gray-300 cursor-pointer'>
              CONTACT SUPPORT
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-4 sm:space-x-12 gap-y-6 w-full mx-auto sm:px-20'>
          <div className='flex flex-col items-start sm:items-center justify-start'>
            <ul className='flex flex-col gap-y-3 text-base text-slate-900 font-light'>
              <h3 className='mb-2 font-semibold text-teal-700 text-lg'>SHOP</h3>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Home
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Products
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Categories
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Best Sellers
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                New Arrivals
              </Link>
            </ul>
          </div>
          <div className='flex flex-col items-start sm:items-center  justify-start'>
            <ul className='flex flex-col gap-y-3 text-base text-slate-900 font-light'>
              <h3 className='mb-2 font-semibold text-teal-700 text-lg'>CUSTOMER SERVICE</h3>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Contact Us
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                FAQ
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Shipping Information
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Returns & Exchanges
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Order Tracking
              </Link>
            </ul>
          </div>
          <div className='flex flex-col items-start sm:items-center  justify-start'>
            <ul className='flex flex-col gap-y-3 text-base text-slate-900 font-light'>
              <h3 className='mb-2 font-semibold text-teal-700 text-lg'>ABOUT US</h3>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Our Story
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Careers
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Press
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Blog
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Sustainability
              </Link>
            </ul>
          </div>
          <div className='flex flex-col items-start sm:items-center  justify-start'>
            <ul className='flex flex-col gap-y-3 text-base text-slate-900 font-light'>
              <h3 className='mb-2 font-semibold text-teal-700 text-lg'>LEGAL</h3>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Privacy Policy
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Terms of Service
              </Link>
              <Link to='#' className='p-0 cursor-pointer hover:text-gray-500'>
                Cookie Policy
              </Link>
            </ul>
          </div>
        </div>
        <hr className='w-full border border-gray-300 max-w-6xl' />
        <div className='w-full sm:px-20 gap-y-6 flex flex-col sm:flex-row items-start sm:items-center justify-around mx-auto'>
          <div className='flex items-center gap-x-12 w-full sm:ml-24'>
            <div className='h-16 w-16'>
              <img className='w-full h-full object-cover object-center' src={logo} alt='logo' />
            </div>
            <div className=''>
              <ul className='flex gap-x-4'>
                <li>
                  <CiFacebook size={28} color='black' />
                </li>
                <li>
                  <FaXTwitter size={28} color='black' />
                </li>
                <li>
                  <CiLinkedin size={28} color='black' />
                </li>
              </ul>
            </div>
          </div>
          <div className='inline-flex space-x-2'>
            <span>© </span>
            <p>2024 Bazaar Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
