import { GET_PRODUCTS } from "configs/url.config";
import http from "api/HttpService.api";

export async function getProducts() {
  try {
    const response = await http.get(GET_PRODUCTS);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
