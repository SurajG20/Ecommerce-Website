import React from "react";

import {
  Place,
  MailOutline,
  LocalPhone,
  LinkedIn,
  Language,
  GitHub,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-sky-400 to-sky-200 pt-4 pb-4 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h1 className="font-bold text-3xl uppercase mb-2 tracking-wider">
              <a href="">Bazaar</a>
            </h1>
            <h4 className="text-3xl font-semibold text-gray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a
                  href="https://github.com/SurajG20/Ecommerce-Website"
                  target="_blank"
                >
                  <LinkedIn />
                </a>
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a href="https://www.surajgoswami.me/" target="_blank">
                  <Language />
                </a>
              </button>

              <button
                className="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a
                  href="https://github.com/SurajG20/Ecommerce-Website"
                  target="_blank"
                >
                  <GitHub />
                </a>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top my-3">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-900 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/"
                    >
                      My Account
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/cart"
                    >
                      Cart
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/cart"
                    >
                      Wishlist
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-900 text-sm font-semibold mb-2">
                  Contact Us
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                    >
                      <Place className="mr-4" />
                      <span>Bhopal, India</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/terms?ref=njs-profile"
                    >
                      <LocalPhone className="mr-4" />
                      <span>+9112345789</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-900 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/privacy?ref=njs-profile"
                    >
                      <MailOutline className="mr-4" />
                      <span>Email Us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
