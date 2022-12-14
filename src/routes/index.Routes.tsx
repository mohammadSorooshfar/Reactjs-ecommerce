import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "pages/home/Home.page";
import DashboardRoutes from "./Dashboard.Routes";
import LoginRoutes from "./Login.Routes";
import PayRoutes from "./Pay.Routes";
import ProductRoutes from "./Product.Routes";
import ProductsRoutes from "./Products.Routes";
import { ScrollToTop } from "utils/functions.util";
import NotFound from "pages/not found/NotFound.page";

const MainRoutes: React.FC = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/login" element={<LoginRoutes />} />
        <Route path="/products/*" element={<ProductsRoutes />} />
        <Route path="/product/*" element={<ProductRoutes />} />
        <Route path="/pay/*" element={<PayRoutes />} />
      </Routes>
    </ScrollToTop>
  );
};

export default MainRoutes;
