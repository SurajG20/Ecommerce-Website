import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const totalQuantity = useSelector((store) => store.cart.totalQuantity);
  const isAuthenticated = useSelector((store) => store.auth.currentUser);
  return (
    <nav className="grid grid-cols-2 p-4 border-b font-semibold h-16">
      <h1 className="font-bold text-2xl uppercase flex items-center justify-start px-4 tracking-wider">
        <a href="/">Bazaar</a>
      </h1>
      <div className="flex justify-end items-center gap-6 text-sm md:text-md px-6">
        {isAuthenticated ? (
          // Display user-related links when authenticated
          <div className="hidden md:flex space-x-6">
            <Link to="/profile" className="uppercase">
              Profile
            </Link>
            <Link to="/logout" className="uppercase">
              Logout
            </Link>
          </div>
        ) : (
          // Display login and register links when not authenticated
          <div className="hidden md:flex space-x-6">
            <Link to="/register" className="uppercase">
              Register
            </Link>
            <Link to="/login" className="uppercase">
              Login
            </Link>
          </div>
        )}
        <Link to="/cart">
          <Badge
            badgeContent={totalQuantity}
            color="primary"
            className="cursor-pointer"
          >
            <ShoppingCart />
          </Badge>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
