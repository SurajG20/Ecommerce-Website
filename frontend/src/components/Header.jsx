import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, User, Menu, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { logoutUser } from '../redux/features/authSlice';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './ui/sheet';
import { LogoutConfirmation } from './LogoutConfirmation';

const mainNav = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Categories', path: '/categories' },
];

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch {
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
        <DropdownMenuItem asChild>
          <Link to="/orders">My Orders</Link>
        </DropdownMenuItem>
        {user?.role === 'admin' && (
          <>
            <DropdownMenuItem onClick={handleAdmin} className="cursor-pointer">
              Admin Panel
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)} className="cursor-pointer text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 py-6">
                  <div className="px-4">
                    <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                      <span className="font-bold text-xl">BAZAAR</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col">
                    {mainNav.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <Link
                          to={item.path}
                          className="px-4 py-2 text-sm text-foreground/60 transition-colors hover:text-foreground hover:bg-muted"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="px-4 pt-4 border-t">
                    {!user ? (
                      <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                          <Link to="/register">
                            <Button variant="outline" className="w-full justify-center">
                              Register
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link to="/login">
                            <Button className="w-full justify-center">Sign In</Button>
                          </Link>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 py-2 mb-2 border-b">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <SheetClose asChild>
                          <Link to="/orders">
                            <Button variant="outline" className="w-full justify-center">
                              My Orders
                            </Button>
                          </Link>
                        </SheetClose>
                        {user.role === 'admin' && (
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={handleAdmin}
                          >
                            Admin Panel
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          className="w-full justify-center"
                          onClick={() => {
                            setShowLogoutConfirm(true);
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">BAZAAR</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex lg:ml-6 lg:gap-6">
              {mainNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
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

            {/* User Menu */}
            {user ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                  <Link to="/register">Register</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <LogoutConfirmation
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;