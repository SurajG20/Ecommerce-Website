import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth-slice";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const quantity = useSelector((store) => store.cart.totalQuantity);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="grid grid-cols-2 p-4 border-b font-semibold h-16">
      <h1 className="font-bold text-2xl uppercase flex items-center justify-start px-4 tracking-wider">
        <a href="/">Bazaar</a>
      </h1>
      <div className="flex-[2] sm:flex-1 flex items-center justify-center sm:justify-end ">
        {!user && (
          <>
            <div className="text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px] ">
              <Link to="/register">REGISTER</Link>
            </div>
            <div className="text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px] ">
              <Link to="/login">SIGN IN</Link>
            </div>
          </>
        )}
        {user && (
          <>
            <div
              onClick={() => setShowPopup((prev) => !prev)}
              className="relative cursor-pointer ml-[10px] border space-x-3 rounded p-2 flex justify-between items-center "
            >
              <AccountCircleIcon className="w-6 h-6 " />
              <div className="text-[12px] sm:text-[14px] tracking-wide ">
                {user?.username.toUpperCase()}
              </div>
              <div
                onClick={handleLogout}
                className={`bg-white shadow-lg absolute bottom-[-70px] ${
                  !showPopup && "opacity-0"
                } z-[3] p-4 rounded-md flex items-center
                  transition duration-300 ease-in-out `}
              >
                <LogoutIcon className="h-6 w-6 text-gray-600 mr-2 " />
                <button className="text-[12px] sm:text-[14px] ">LOGOUT</button>
              </div>
            </div>
          </>
        )}
        <Link to="/cart">
          <Badge
            className="ml-[10px] sm:ml-[25px] cursor-pointer"
            badgeContent={quantity}
            color="primary"
          >
            <ShoppingCart />
          </Badge>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
