import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "pages/home/Home.page";
import DashboardRoutes from "./Dashboard.Routes";
import LoginRoutes from "./Login.Routes";
import PayRoutes from "./Pay.Routes";
import ProductRoutes from "./Product.Routes";
import ProductsRoutes from "./Products.Routes";
const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/login" element={<LoginRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
      <Route path="/product/*" element={<ProductRoutes />} />
      <Route path="/pay/*" element={<PayRoutes />} />
    </Routes>
  );
};

export default MainRoutes;
