import Footer from './Footer';
import { Header } from './Header';
import Announcement from './Announcement';
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Announcement />
      <Header />
      <main className="flex-1 container mx-auto py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
