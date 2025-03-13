import { useState } from 'react';
import { ShoppingCart, User, LogOut, Settings, Menu, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/features/authSlice';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium hidden md:block">
            {user?.name?.split(' ')[0]}
          </span>
          <ChevronDown className="h-4 w-4 hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === 'admin' && (
          <>
            <DropdownMenuItem onClick={handleAdmin} className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Admin Panel
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const CartButton = () => (
    <Link to="/cart">
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cart.totalQuantity > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          >
            {cart.totalQuantity}
          </Badge>
        )}
      </Button>
    </Link>
  );

  const MobileMenu = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {!user ? (
            <div className="grid gap-4">
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  Register
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center gap-2 px-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{user.name}</span>
              </div>
              {user.role === 'admin' && (
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={handleAdmin}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
              <Button
                variant="destructive"
                className="justify-start"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
          <SheetClose asChild>
            <Link to="/cart">
              <Button variant="outline" className="w-full justify-start gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart ({cart.totalQuantity})
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif text-primary">Bazaar</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {!user ? (
              <>
                <Link to="/register">
                  <Button variant="ghost" size="sm">Register</Button>
                </Link>
                <Link to="/login">
                  <Button size="sm">Sign In</Button>
                </Link>
              </>
            ) : (
              <UserDropdown />
            )}
            <CartButton />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton />
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
