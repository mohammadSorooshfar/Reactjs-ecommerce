import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);

  return cartProducts.length !== 0 ? (
    <Outlet />
  ) : (
    <Navigate to={"/tehranshoes/pay/cart"} />
  );
};
