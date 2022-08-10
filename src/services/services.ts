import { getProductsAdmin } from "api/admin/products.api";
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
export const getProductsAdminService = async (
  page: string,
  pageSize: string
) => {
  try {
    const response = await getProductsAdmin(page, pageSize);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
