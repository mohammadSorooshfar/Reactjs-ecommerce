import { getOrdersAdmin } from "api/admin/order.api";
import { getProductsAdmin } from "api/admin/products.api";
import { Login } from "api/auth/login.api";
import { ACCESS_TOKEN } from "configs/variables.config";
import { TDeliveryStatus } from "types/interfaces.types";
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
  pageSize: string,
  searchOption: string,
  searchText: string
) => {
  try {
    const response = await getProductsAdmin(
      page,
      pageSize,
      searchOption,
      searchText
    );
    return { data: response.data, total: response.headers["x-total-count"] };
  } catch (e) {
    return Promise.reject(e);
  }
};
export const getOrdersAdminService = async (
  deliveryStatus: TDeliveryStatus,
  page: string,
  pageSize: string,
  searchOption: string,
  searchText: string
) => {
  try {
    const response = await getOrdersAdmin(
      deliveryStatus,
      page,
      pageSize,
      searchOption,
      searchText
    );
    return { data: response.data, total: response.headers["x-total-count"] };
  } catch (e) {
    return Promise.reject(e);
  }
};
