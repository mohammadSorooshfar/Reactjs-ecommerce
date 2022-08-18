import { GET_PRODUCTS } from "configs/url.config";
import http from "api/HttpService.api";

export async function getProducts(
  page: string,
  pageSize: string,
  filters: string
) {
  try {
    const response = await http.get(
      GET_PRODUCTS + "?" + filters + "_page=" + page + "&_limit=" + pageSize
    );
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function getProduct(id: string) {
  try {
    const response = await http.get(GET_PRODUCTS + "/" + id);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
