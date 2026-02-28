import axios from "axios";
import { useUserStore } from '@/store/userStore';

// 基础配置
// 需要在 .env.development 中配置 VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";
const TIMEOUT = 5000;

// 刷新 token 的地址
const REFRESH_TOKEN_URL = import.meta.env.VITE_REFRESH_TOKEN_URL || "api/token/refresh/";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      // 允许携带 cookie
      withCredentials: true,
    });

    // 是否已经刷新token
    this.isRefreshing = false;
    // 刷新token前等待的请求队列
    this.refreshTokenQueue = [];

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 获取用户的 store
        const user = useUserStore();
        // 在请求头中添加 token
        if (user.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
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
        const user = useUserStore();
        // 记录原始请求
        const originalRequest = error.config;
        // 如果原始请求不存在，则返回错误
        if (!originalRequest) {
          return Promise.reject(error);
        }
        // 当请求返回401未授权时，如果之前没有尝试过刷新token，则尝试刷新token
        if (error.response?.status === 401 && !originalRequest._retry) {
          // access token 过期，尝试更新 access token
          originalRequest._retry = true; // 设置请求重试
          // 开始请求刷新 token
          return new Promise((resolve, reject) => {
            // 将这次请求401未授权的请求添加到等待队列中
            this.addRequest((token, error) => {
              if (error) {
                reject(error);
              } else {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                // 重新发送原始请求
                resolve(this.instance(originalRequest));
              }
            });

            // 如果未在刷新，则开始刷新
            if (!this.isRefreshing) {
              this.isRefreshing = true;
              this.post(REFRESH_TOKEN_URL, {}, { withCredentials: true }).then((response) => {
                const { access } = response.data; // 后端返回token字段名要为access
                user.setAccessToken(access); // 更新用户的 access token
                // 将
                this.forEachRequestAddAccessToken(access);
              }).catch(error => {
                // 刷新 token 失败
                user.logout();
                // 将请求队列每个请求添加请求错误的原因
                this.addErrorToRequest(error);
                reject(error);
              }).finally(() => {
                // 刷新 token 完成后，无论成功与否，将 isRefreshing 设置为 false
                this.isRefreshing = false;
              });
            }
          });
        }
        return Promise.reject(error);
      }
    );
  }

  // 添加未授权的请求到等待队列
  addRequest(callback) {
    console.log('将未授权的请求添加到等待队列 => ', callback);
    this.refreshTokenQueue.push(callback);
  }

  // 为未授权的请求队列每个请求添加请求错误
  addErrorToRequest(error) {
    console.log('刷新token失败，将错误原因添加到未授权的代请求队列 => ', error);
    this.refreshTokenQueue.forEach(callback => callback(null, error));
    this.refreshTokenQueue = [];
  }

  // 遍历请求队列，并为每个未授权的请求添加上新的 token
  forEachRequestAddAccessToken(access_token) {
    console.log('给未授权的请求队列，并为每个请求添加上新的token => ', access_token);
    this.refreshTokenQueue.forEach(callback => callback(access_token));
    this.refreshTokenQueue = [];
  }

  // 请求方法
  get(url, params = {}, config = {}) {
    return this.instance.get(url, { params, ...config });
  }
  post(url, data = {}, config = {}) {
    return this.instance.post(url, data, config);
  }
  put(url, data = {}, config = {}) {
    return this.instance.put(url, data, config);
  }
  delete(url, params = {}, config = {}) {
    return this.instance.delete(url, { params, ...config });
  }
}

export default new Http();
