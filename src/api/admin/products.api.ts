import { GET_PRODUCTS } from "configs/url.config";
import http from "api/HttpService.api";

export async function getProductsAdmin(page: string, pageSize: string) {
  try {
    const response = await http.get(
      GET_PRODUCTS + "?_page=" + page + "&_limit=" + pageSize
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
