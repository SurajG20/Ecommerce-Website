import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import ShoppingCategorie from "./pages/ShoppingCategorie";
import SingleProduct from "./pages/SingleProduct";
import ShoppingCart from "./pages/ShoppingCart";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Admin from "./components/protectedRoute/Admin";
import UpdateProduct from "./components/protectedRoute/UpdateProduct";

const App = () => {
  const user = useSelector((store) => store.auth.currentUser);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:category" element={<ShoppingCategorie />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route
        path="/admin"
        element={!user?.isAdmin ? <Navigate to="/" /> : <Admin />}
      />
      <Route
        path="/admin/product/:id"
        element={!user?.isAdmin ? <Navigate to="/" /> : <UpdateProduct />}
      />
    </Routes>
  );
};

export default App;
