import { useState } from 'react';
import { ShoppingCart, User, LogOut, Settings, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/features/authSlice';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <User size={20} />
          <span className="text-sm font-medium">{user?.name?.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {user?.role === 'admin' && (
          <>
            <DropdownMenuItem onClick={handleAdmin} className="cursor-pointer">
              <Settings size={18} className="mr-2" />
              Admin Panel
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut size={18} className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const CartButton = () => (
    <Link to="/cart">
      <Button variant="ghost" className="relative">
        <ShoppingCart size={24} />
        {cart.totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.totalQuantity}
          </span>
        )}
      </Button>
    </Link>
  );

  const MobileMenu = () => (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {!user ? (
            <>
              <Link to="/register">
                <Button variant="outline" className="w-full">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-2">
                <User size={20} />
                <span className="font-medium">{user.name}</span>
              </div>
              {user.role === 'admin' && (
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={handleAdmin}
                >
                  <Settings size={18} />
                  Admin Panel
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </Button>
            </>
          )}
          <Link to="/cart">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <ShoppingCart size={18} />
              Cart ({cart.totalQuantity})
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif text-teal-600">Bazaar</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/register">
                  <Button variant="outline">Register</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </>
            ) : (
              <UserMenu />
            )}
            <CartButton />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <CartButton />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
