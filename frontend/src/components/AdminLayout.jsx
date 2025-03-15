import { LayoutDashboard, Package, PlusCircle, Settings, Users, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/features/authSlice';
import { toast } from 'sonner';
import { Button } from './ui/button';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      description: 'Overview of your store'
    },
    {
      name: 'Products',
      icon: Package,
      path: '/admin/products',
      description: 'Manage your products'
    },
    {
      name: 'Add Product',
      icon: PlusCircle,
      path: '/admin/add-product',
      description: 'Add new products'
    },
    {
      name: 'Users',
      icon: Users,
      path: '/admin/users',
      description: 'Manage user accounts'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      description: 'Admin settings'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="font-bold text-xl">BAZAAR</Link>
        </div>
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
                title={item.description}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card/50">
          <div className="h-full px-6 flex items-center justify-between">
            <h2 className="text-lg font-medium">
              {navigationItems.find((item) => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
