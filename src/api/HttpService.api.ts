import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "configs/url.config";
import { toast } from "react-toastify";

class HttpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL;
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status >= 400) {
          if (error.response.status === 401) {
            toast.error("شما امکان انجام این عملیات را ندارید");
          } else {
            toast.error("درخواست شما نا مناسب می باشد");
          }
        } else if (error.response.status > 500) {
          toast.error("سرور با مشکل مواجه شد");
        }

        return Promise.reject(error);
      }
    );
  }
  get(url: string, config?: AxiosRequestConfig) {
    return axios.get(url, config);
  }
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return axios.post(url, data, config);
  }
  put(url: string, data: any, config?: AxiosRequestConfig) {
    return axios.put(url, data, config);
  }
  patch(url: string, data: any, config?: AxiosRequestConfig) {
    return axios.patch(url, data, config);
  }
  delete(url: string, config?: AxiosRequestConfig) {
    return axios.delete(url, config);
  }
}
export default new HttpService();
