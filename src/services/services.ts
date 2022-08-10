import { getProducts } from "api/admin/products.api";
import { Login } from "api/auth/login.api";
import { ACCESS_TOKEN } from "configs/variables.config";
export const loginService = async (data: any) => {
  try {
    const response = await Login(data);
    localStorage.setItem(ACCESS_TOKEN, response.token);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
export const getProductsService = async () => {
  try {
    const response = await getProducts();
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
