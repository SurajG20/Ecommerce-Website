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

      <Route path="/register" element={<Register />}></Route>
      <Route path="/success" element={<Success />}></Route>
      <Route path="/cancel" element={<Cancel />}></Route>
    </Routes>
  );
};

export default App;
