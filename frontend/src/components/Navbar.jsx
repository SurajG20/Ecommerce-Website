import { useState } from 'react';
import { Badge, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/auth-slice';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const data = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      toast.success('Logged out successfully');
    });
    navigate('/');
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <List>
      {!data ? (
        <>
          <ListItem component={Link} to='/register'>
            <ListItemText
              primary='Register'
              className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3 text-center'
            />
          </ListItem>
          <ListItem component={Link} to='/login'>
            <ListItemText
              primary='Sign In'
              className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3 text-center'
            />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem onClick={handleLogout}>
            <ListItemText
              primary='Logout'
              className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3 text-center'
            />
          </ListItem>
          {data?.user?.role === 'admin' && (
            <ListItem onClick={handleAdmin}>
              <ListItemText
                primary='Admin Panel'
                className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3 text-center'
              />
            </ListItem>
          )}
        </>
      )}
      <ListItem component={Link} to='/cart'>
        <ListItemText
          primary='Cart'
          className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3 text-center'
        />
      </ListItem>
    </List>
  );

  return (
    <nav className='grid grid-cols-2 p-4 border-b font-semibold h-fit'>
      <h1 className='font-bold text-2xl uppercase flex items-center justify-start px-4 tracking-wider'>
        <a href='/' className='text-3xl font-serif text-teal-600'>
          Bazaar
        </a>
      </h1>
      <div className='flex-[2] sm:flex-1 flex items-center justify-end'>
        <div className='hidden sm:flex items-center'>
          {!data && (
            <>
              <Link
                to='/register'
                className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3'
              >
                Register
              </Link>
              <Link
                to='/login'
                className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded px-6 py-3'
              >
                Sign In
              </Link>
            </>
          )}
          {data && (
            <>
              <div
                onClick={() => setShowPopup((prev) => !prev)}
                className='relative cursor-pointer rounded p-2 flex justify-between items-center'
              >
                <AccountCircleIcon className='w-6 h-6 mr-1' />
                <div className='text-[12px] sm:text-[14px] tracking-wide flex items-center justify-center'>
                  {data?.user?.name?.toUpperCase()}
                </div>
                {data?.user?.role === 'admin' && showPopup && (
                  <div className='bg-white shadow-lg absolute left-[-20px] bottom-[-50px] z-[3] px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out'>
                    <button
                      className='text-[12px] sm:text-[14px] flex items-center justify-center'
                      onClick={handleAdmin}
                    >
                      <AdminPanelSettingsIcon className='h-6 w-6 text-gray-600 mr-2' />
                      Admin Panel
                    </button>
                  </div>
                )}
                <div
                  className='text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px]'
                  onClick={handleLogout}
                >
                  <LogoutIcon className='h-6 w-6 text-gray-600 mr-2' />
                  LOGOUT
                </div>
              </div>
            </>
          )}
          <Link to='/cart' className='ml-[10px] sm:ml-[30px] cursor-pointer'>
            <Badge badgeContent={cart.totalQuantity} color='primary'>
              <CiShoppingCart className='w-8 h-8' />
            </Badge>
          </Link>
        </div>
        <div className='flex justify-end sm:hidden'>
          <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className='flex justify-end p-4'>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        {menuItems}
      </Drawer>
    </nav>
  );
};

export default Navbar;
