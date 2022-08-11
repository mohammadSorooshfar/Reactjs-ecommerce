import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { CheckUserExpired } from "utils/functions.util";

const useAuth = () => {
  if (localStorage.hasOwnProperty("ACCESS_TOKEN")) {
    return true;
  } else {
    return false;
  }
};

export const PrivateRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    CheckUserExpired();
  }, [location]);
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/tehranshoes/login"} />;
};
