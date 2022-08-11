import { GET_PRODUCTS, GET_ORDERS } from "configs/url.config";
import http from "api/HttpService.api";
import { TDeliveryStatus } from "types/interfaces.types";

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
export async function getOrdersAdmin(
  deliveryStatus: TDeliveryStatus,
  page: string,
  pageSize: string
) {
  try {
    const response = await http.get(
      GET_ORDERS +
        `?deliveryStatus=${deliveryStatus}&_page=${page}&_limit=${pageSize}`
    );

    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
