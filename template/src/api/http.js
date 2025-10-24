import axios from "axios";

// 基础配置
// 需要在 .env.development 中配置 VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";
const TIMEOUT = 5000;

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在请求头中添加 token
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // 请求方法
  get(url, params = {}) {
    return this.instance.get(url, { params });
  }
  post(url, data = {}) {
    return this.instance.post(url, data);
  }
  put(url, data = {}) {
    return this.instance.put(url, data);
  }
  delete(url, params = {}) {
    return this.instance.delete(url, { params });
  }
}

export default new Http();
