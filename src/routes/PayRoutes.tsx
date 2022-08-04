import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "pages/cart/Cart";
import Checkout from "pages/checkout/Checkout";
import Payment from "pages/payment/Payment";
import UserLayout from "layouts/UserLayout";
const PayRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </UserLayout>
  );
};

export default PayRoutes;
