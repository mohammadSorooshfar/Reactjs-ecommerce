import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "pages/products/Products.page";
import UserLayout from "layouts/User.Layout";
const ProductsRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:gender/:category" element={<Products />} />
      </Routes>
    </UserLayout>
  );
};

export default ProductsRoutes;
