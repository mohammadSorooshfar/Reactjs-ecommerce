import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/product details/ProductDetails";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Payment from "../pages/payment/Payment";
const PayRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default PayRoutes;
