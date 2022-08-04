import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard/Dashboard";
const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/products" element={<Dashboard />} />
      <Route path="/inventory" element={<Dashboard />} />
      <Route path="/orders" element={<Dashboard />} />
    </Routes>
  );
};

export default DashboardRoutes;
