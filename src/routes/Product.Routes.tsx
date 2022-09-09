import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "pages/product details/ProductDetails.page";
import UserLayout from "layouts/User.Layout";
import NotFound from "pages/not found/NotFound.page";

const ProductRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/:id/*" element={<NotFound />} />
      </Routes>
    </UserLayout>
  );
};

export default ProductRoutes;
