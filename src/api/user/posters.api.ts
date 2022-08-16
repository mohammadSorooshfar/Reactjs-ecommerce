import http from "api/HttpService.api";
import { GET_POSTERS } from "configs/url.config";
export async function getPosters() {
  try {
    const response = await http.get(GET_POSTERS);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
