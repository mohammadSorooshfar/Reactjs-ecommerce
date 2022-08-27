import http from "api/HttpService.api";
import { GET_ORDERS } from "configs/url.config";
import { IOrder } from "types/interfaces.types";
export async function addOrder(data: IOrder) {
  try {
    const response = await http.post(GET_ORDERS, data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
