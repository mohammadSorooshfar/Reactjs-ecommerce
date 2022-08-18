import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "pages/login/Login.page";
const LoginRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default LoginRoutes;
