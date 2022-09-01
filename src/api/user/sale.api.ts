import { GET_SALE_CODES } from "configs/url.config";
import http from "api/HttpService.api";

export async function getSaleCodes() {
  try {
    const response = await http.get(GET_SALE_CODES);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
