import { GET_PRODUCTS } from "configs/url.config";
import http from "api/HttpService.api";

export async function getProductsAdmin(
  page: string,
  pageSize: string,
  searchOption: string,
  searchText: string
) {
  try {
    const response = await http.get(
      GET_PRODUCTS +
        "?" +
        searchOption +
        "_like=" +
        searchText +
        "&_page=" +
        page +
        "&_limit=" +
        pageSize
    );
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
