import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "pages/cart/Cart.page";
import Checkout from "pages/checkout/Checkout.page";
import Payment from "pages/payment/Payment.page";
import UserLayout from "layouts/User.Layout";
import { ProtectedRoutes } from "./Protected.Routes";
const PayRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/:result" element={<Payment />} />
        </Route>
      </Routes>
    </UserLayout>
  );
};

export default PayRoutes;
