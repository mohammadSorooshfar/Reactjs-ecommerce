import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  return localStorage.getItem("cart") ? (
    <Outlet />
  ) : (
    <Navigate to={"/tehranshoes/pay/cart"} />
  );
};
