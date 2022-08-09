import { LOGIN } from "configs/url.config";
import {
  ACCESS_TOKEN,
  IS_LOGGED_IN,
  REFRESH_TOKEN,
} from "configs/variables.config";
import http from "api/HttpService.api";
import { parseJwt } from "utils/functions.util";

export async function Login(data: any) {
  const response = await http.post(LOGIN, data);
  return response.data;
}
