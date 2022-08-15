import { getOrdersAdmin } from "api/admin/order.api";
import {
  addProductAdmin,
  deleteProductsAdmin,
  getProductsAdmin,
  updateProductsAdmin,
  uploadImageAdmin,
} from "api/admin/products.api";
import { Login } from "api/auth/login.api";
import { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "configs/variables.config";
import { IProduct, TDeliveryStatus } from "types/interfaces.types";
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
    return { data: response.data, total: response.headers["x-total-count"] };
  } catch (e) {
    return Promise.reject(e);
  }
};
export const getOrdersAdminService = async (
  deliveryStatus: TDeliveryStatus,
  page: string,
  pageSize: string
) => {
  try {
    const response = await getOrdersAdmin(deliveryStatus, page, pageSize);
    return { data: response.data, total: response.headers["x-total-count"] };
  } catch (e) {
    return Promise.reject(e);
  }
};
export const deleteProductsAdminService = async (id: string) => {
  try {
    const response = await deleteProductsAdmin(id);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
export const updateProductsAdminService = async (
  id: string,
  data: IProduct
) => {
  try {
    const response = await updateProductsAdmin(id, data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
export const uploadImagesAdminService = async (data: FormData, config: any) => {
  try {
    const response = await uploadImageAdmin(data, config);
    return response.data.filename;
  } catch (e) {
    return Promise.reject(e);
  }
};
export const addProductAdminService = async (data: any) => {
  try {
    const response = await addProductAdmin(data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
