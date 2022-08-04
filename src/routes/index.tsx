import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "pages/home/Home";
import DashboardRoutes from "./DashboardRoutes";
import LoginRoutes from "./LoginRoutes";
import PayRoutes from "./PayRoutes";
import ProductRoutes from "./ProductRouter";
import ProductsRoutes from "./ProductsRoutes";
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
