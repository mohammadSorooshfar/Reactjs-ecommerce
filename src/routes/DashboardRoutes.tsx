import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard/Dashboard";
import DashboardLayout from "layouts/dashboardLayout";
const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/products" element={<Dashboard />} />
        <Route path="/inventory" element={<Dashboard />} />
        <Route path="/orders" element={<Dashboard />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
