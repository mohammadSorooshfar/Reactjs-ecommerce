import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "pages/product details/ProductDetails";
import UserLayout from "layouts/UserLayout";

const ProductRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
    </UserLayout>
  );
};

export default ProductRoutes;
