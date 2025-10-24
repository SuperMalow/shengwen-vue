import http from "./http";

// 登录
const login = (data) => {
  const url = "api/account/login/"; // 登录接口
  return http.post(url, data);
};

export { login };
