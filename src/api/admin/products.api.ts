import { GET_PRODUCTS } from "configs/url.config";
import http from "api/HttpService.api";

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
