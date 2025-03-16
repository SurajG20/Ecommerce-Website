/* eslint-disable react-refresh/only-export-components */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home';
import ShoppingCategorie from '../pages/ShoppingCategorie';
import SingleProduct from '../pages/SingleProduct';
import ShoppingCart from '../pages/ShoppingCart';
import Orders from '../pages/Orders';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import Admin from '../pages/Admin/Admin';
import UpdateProduct from '../pages/Admin/UpdateProduct';
import Products from '../pages/Products';
import Categories from '../pages/Categories';
import ProductsData from '../pages/Admin/ProductsData';
import AddProduct from '../pages/Admin/AddProduct';
import AdminLayout from '../components/AdminLayout';
import ContactUs from '../pages/ContactUs';
import FAQ from '../pages/FAQ';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPage from '../pages/Privacy';
import Users from '../pages/Admin/Users';
import Settings from '../pages/Admin/Settings';
import Maintenance from '../pages/Maintenance';
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AuthGuard = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/categories/:category',
    element: <ShoppingCategorie />,
  },
  {
    path: '/products/:id',
    element: <SingleProduct />,
  },
  {
    path: '/cart',
    element: <ShoppingCart />,
  },
  {
    path: '/contact',
    element: <ContactUs />,
  },
  {
    path: '/faq',
    element: <FAQ />,
  },
  {
    path: '/terms',
    element: <TermsOfService />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/maintenance',
    element: <Maintenance />,
  },
];

export const authRoutes = [
  {
    path: '/login',
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthGuard>
        <Register />
      </AuthGuard>
    ),
  },
];

export const protectedRoutes = [

  {
    path: '/orders',
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: '/success',
    element: (
      <ProtectedRoute>
        <Success />
      </ProtectedRoute>
    ),
  },
  {
    path: '/cancel',
    element: (
      <ProtectedRoute>
        <Cancel />
      </ProtectedRoute>
    ),
  },
];

export const adminRoutes = [
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <Admin />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <ProductsData />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/add-product',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <AddProduct />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/product/:id',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <UpdateProduct />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <Users />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <Settings />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
];

export const routes = [...publicRoutes, ...authRoutes, ...protectedRoutes, ...adminRoutes];