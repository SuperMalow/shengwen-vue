import http from "./http";

// 登录
const login = (data) => {
  const url = "api/account/login/"; // 登录接口
  return http.post(url, data);
};

// 获取用户信息，通常用于鉴别token是否过期
const pullUserInfo = () => {
  // 获取用户信息接口
  const url = 'api/account/info/';
  return http.get(url);
};

export { login, pullUserInfo };
