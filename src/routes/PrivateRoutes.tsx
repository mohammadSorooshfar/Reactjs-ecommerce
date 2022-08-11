import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { checkAuth, CheckUserExpired } from "utils/functions.util";

export const PrivateRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    CheckUserExpired();
  }, [location]);
  const isAuth = checkAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/tehranshoes/login"} />;
};
