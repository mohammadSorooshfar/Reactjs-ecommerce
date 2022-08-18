import { GET_PRODUCTS, UPLOAD_IMAGE } from "configs/url.config";
import http from "api/HttpService.api";
import { IProduct } from "types/interfaces.types";
import { AxiosRequestConfig } from "axios";

export async function getProductsAdmin(page: string, pageSize: string) {
  try {
    const response = await http.get(
      GET_PRODUCTS + "?_page=" + page + "&_limit=" + pageSize
    );
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function deleteProductsAdmin(id: string) {
  try {
    const response = await http.delete(GET_PRODUCTS + "/" + id);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function updateProductsAdmin(id: string, data: IProduct) {
  try {
    const response = await http.put(GET_PRODUCTS + "/" + id, data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function uploadImageAdmin(data: FormData, config: any) {
  try {
    const response = await http.post(UPLOAD_IMAGE, data, config);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function addProductAdmin(data: any) {
  try {
    const response = await http.post(GET_PRODUCTS, data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
