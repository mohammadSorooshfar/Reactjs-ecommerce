import http from "api/HttpService.api";
import { GET_ORDERS } from "configs/url.config";
import { IOrder, TDeliveryStatus } from "types/interfaces.types";

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
export async function updateOrdersAdmin(id: string, data: IOrder) {
  try {
    const response = await http.put(GET_ORDERS + "/" + id, data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
