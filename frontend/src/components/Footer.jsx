import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from './ui/separator';

const footerLinks = {
  shop: [
    { label: 'Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'Orders', path: '/orders' },
  ],
  support: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ],
  legal: [
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
};

const socialLinks = [
  { Icon: Facebook, label: 'Facebook', url: '#' },
  { Icon: Twitter, label: 'Twitter', url: '#' },
  { Icon: Instagram, label: 'Instagram', url: '#' },
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
              <h3 className="font-semibold">Bazaar</h3>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
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

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <nav className="flex flex-col gap-2">
                {footerLinks.support.map((link) => (
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

          <Separator />

          <div className="text-xs text-center text-muted-foreground">
            © {currentYear} Bazaar Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
