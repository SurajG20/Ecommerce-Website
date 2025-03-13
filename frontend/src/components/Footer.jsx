import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';

const footerLinks = {
  shop: [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'Best Sellers', path: '/best-sellers' },
    { label: 'New Arrivals', path: '/new-arrivals' },
  ],
  customerService: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Shipping Information', path: '/shipping' },
    { label: 'Returns & Exchanges', path: '/returns' },
    { label: 'Order Tracking', path: '/track-order' },
  ],
  aboutUs: [
    { label: 'Our Story', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Blog', path: '/blog' },
    { label: 'Sustainability', path: '/sustainability' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
  ],
};

const socialLinks = [
  { Icon: Facebook, label: 'Facebook', url: '#' },
  { Icon: Twitter, label: 'Twitter', url: '#' },
  { Icon: Linkedin, label: 'LinkedIn', url: '#' },
];

const FooterLinkSection = ({ title, links }) => (
  <div className="flex flex-col items-start sm:items-center justify-start">
    <ul className="flex flex-col gap-y-3 text-base text-slate-900 font-light">
      <h3 className="mb-2 font-semibold text-teal-700 text-lg">{title}</h3>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className="p-0 cursor-pointer hover:text-gray-500 transition-colors duration-200"
        >
          {link.label}
        </Link>
      ))}
    </ul>
  </div>
);

FooterLinkSection.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mx-auto bg-gray-200 px-6 sm:px-12 py-8">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center space-y-12">
        {/* Heading */}
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl sm:text-4xl font-medium tracking-wide leading-normal">
            Your One-Stop Shopping Destination
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="w-full flex mx-auto justify-center flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <button className="w-full sm:w-auto bg-teal-700 rounded-md shadow-lg px-8 py-3 text-center text-sm sm:text-lg font-medium text-white border border-white hover:bg-teal-500 transition-colors duration-200">
            SUBSCRIBE FOR OFFERS
          </button>
          <button className="w-full sm:w-auto bg-white rounded-md shadow-lg px-8 py-3 text-center text-sm sm:text-lg font-medium text-teal-700 border border-teal-700 hover:bg-gray-100 transition-colors duration-200">
            CONTACT SUPPORT
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <FooterLinkSection title="SHOP" links={footerLinks.shop} />
          <FooterLinkSection title="CUSTOMER SERVICE" links={footerLinks.customerService} />
          <FooterLinkSection title="ABOUT US" links={footerLinks.aboutUs} />
          <FooterLinkSection title="LEGAL" links={footerLinks.legal} />
        </div>

        <hr className="w-full border border-gray-300" />

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="h-16 w-16">
              <img className="w-full h-full object-contain" src={logo} alt="Bazaar Logo" />
            </Link>
            <ul className="flex gap-6">
              {socialLinks.map(({ Icon, label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-teal-700 transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-gray-600">
            © {currentYear} Bazaar Inc. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
