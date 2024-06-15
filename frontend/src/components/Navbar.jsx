import { Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/auth-slice';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.currentUser);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const handleAdmin = () => {
    navigate('/admin');
  };

  return (
    <nav className='grid grid-cols-2 p-4 border-b font-semibold h-16'>
      <h1 className='font-bold text-2xl uppercase flex items-center justify-start px-4 tracking-wider'>
        <a href='/' className='text-3xl font-serif text-blue-600'>
          Bazaar
        </a>
      </h1>
      <div className='flex-[2] sm:flex-1 flex items-center justify-center sm:justify-end '>
        {!user && (
          <>
            <div className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] '>
              <Link to='/register'>Register</Link>
            </div>
            <div className='text-[12px] sm:text-lg capitalize cursor-pointer ml-[10px] sm:ml-[25px] '>
              <Link to='/login'>Sign In</Link>
            </div>
          </>
        )}
        {user && (
          <>
            <div
              onClick={() => setShowPopup((prev) => !prev)}
              className='relative cursor-pointer  rounded p-2 flex justify-between items-center'
            >
              <div className='text-[12px] sm:text-[14px] tracking-wide flex items-center justify-center  '>
                <AccountCircleIcon className='w-6 h-6 mr-1' />
                {user?.username.toUpperCase()}
              </div>
              {user.isAdmin && (
                <div
                  className={`bg-white shadow-lg absolute left-[-20px] bottom-[-50px] ${
                    !showPopup && 'opacity-0'
                  } z-[3] px-4 py-2 rounded-md flex items-center
                  transition duration-300 ease-in-out `}
                >
                  <button className='text-[12px] sm:text-[14px] flex items-center justify-center' onClick={handleAdmin}>
                    <AdminPanelSettingsIcon className='h-6 w-6 text-gray-600 mr-2 ' />
                    AdminPanel
                  </button>
                </div>
              )}

              <div className='text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px] ' onClick={handleLogout}>
                <LogoutIcon className='h-6 w-6 text-gray-600 mr-2 ' />
                LOGOUT
              </div>
            </div>
          </>
        )}

        <Link to='/cart'>
          <Badge className='ml-[10px] sm:ml-[30px] cursor-pointer' badgeContent={cart.totalQuantity} color='primary'>
            <ShoppingCart />
          </Badge>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
