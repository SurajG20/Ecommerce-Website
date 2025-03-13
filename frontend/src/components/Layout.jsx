import PropTypes from 'prop-types';
import Announcements from './Announcement';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Announcements />
      <Navbar />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
