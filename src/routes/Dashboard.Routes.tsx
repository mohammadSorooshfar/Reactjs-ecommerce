import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard/Dashboard.page";
import DashboardLayout from "layouts/Dashboard.Layout";
import { PrivateRoutes } from "./Private.Routes";
import NotFound from "pages/not found/NotFound.page";
const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/products" element={<Dashboard />} />
          <Route path="/inventory" element={<Dashboard />} />
          <Route path="/orders" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
