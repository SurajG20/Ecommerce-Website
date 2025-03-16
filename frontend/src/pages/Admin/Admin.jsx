import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, Users, DollarSign, ShoppingCart } from 'lucide-react';
import { fetchAdminProducts } from '../../redux/features/adminSlice';
import { fetchUsers } from '../../redux/features/adminSlice';

const StatCard = ({ title, value, icon: Icon, linkTo }) => (
  <Link
    to={linkTo}
    className="bg-card hover:bg-card/90 transition-colors p-6 rounded-lg shadow-sm border flex items-center gap-4"
  >
    <div className="p-4 bg-primary/10 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
    </div>
  </Link>
);

const Admin = () => {
  const dispatch = useDispatch();
  const { totalProducts,  totalUsers } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts({ page: 1, limit: 1 }));
    dispatch(fetchUsers({ page: 1, limit: 1 }));
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts || 0,
      icon: Package,
      linkTo: '/admin/products'
    },
    {
      title: 'Total Users',
      value: totalUsers || 0,
      icon: Users,
      linkTo: '/admin/users'
    },
    {
      title: 'Total Revenue',
      value: '$0.00',
      icon: DollarSign,
      linkTo: '/admin/orders'
    },
    {
      title: 'Total Orders',
      value: '0',
      icon: ShoppingCart,
      linkTo: '/admin/orders'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
