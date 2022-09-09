import UserLayout from "layouts/User.Layout";
import NotFound from "pages/not found/NotFound.page";
import Products from "pages/products/Products.page";
import React from "react";
import { Route, Routes } from "react-router-dom";
const ProductsRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:gender/:category" element={<Products />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </UserLayout>
  );
};

export default ProductsRoutes;
