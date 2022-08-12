import http from "api/HttpService.api";
import { LOGIN } from "configs/url.config";

export async function Login(data: any) {
  const response = await http.post(LOGIN, data);
  return response.data;
}
