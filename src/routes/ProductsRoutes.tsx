import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/product details/ProductDetails";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Payment from "../pages/payment/Payment";
const ProductsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/:category" element={<Products />} />
    </Routes>
  );
};

export default ProductsRoutes;
