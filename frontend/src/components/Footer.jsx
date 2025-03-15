import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from './ui/separator';

const footerLinks = {
  shop: [
    { label: 'All Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'My Orders', path: '/orders' },
    { label: 'Shopping Cart', path: '/cart' },
  ],
  help: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ],
  legal: [
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
};

const socialLinks = [
  { Icon: Facebook, label: 'Facebook', url: 'https://facebook.com' },
  { Icon: Twitter, label: 'Twitter', url: 'https://twitter.com' },
  { Icon: Instagram, label: 'Instagram', url: 'https://instagram.com' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted/40 py-8">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-bold">Bazaar</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your one-stop shop for quality products at great prices.
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.shop.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.help.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="text-sm text-center text-muted-foreground">
            © {currentYear} Bazaar Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
