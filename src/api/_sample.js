// axios
import axios from "axios";

// token 사용하는 auth instance 시작
const auth = axios.create({
  baseURL: 'https://www.jigeumyeogi.site/',
});
const accessToken = localStorage.getItem('accessToken');
auth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

// 토큰 만료 후 요청 저장 작업
let isTokenRefreshing = false;
let refreshSubscribers = [];
const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
// 응답 interceptor
auth.interceptors.response.use(
  res => res, // 200번대 응답
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;
    if (status === 401) {
      // 토큰 재발급 아닐 경우에만 token refresh 요청
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        // token refresh 요청
        const refreshToken = localStorage.getItem('refreshToken');
        if(!refreshToken) {
          alert('토큰이 만료되었습니다. 다시 로그인 해 주세요');
          localStorage.setItem('accessToken', '');
          return;
        }
        const { data } = await auth.post(`auth/token-refresh`, {
          params: { refreshToken: refreshToken } 
        });
        // 새로운 토큰 저장
        localStorage.setItem('accessToken', data.accessToken);
        isTokenRefreshing = false;
        auth.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        // 새로운 토큰으로 지연되었던 요청 진행
        onTokenRefreshed(data.accessToken);
      }
      // token 재발급 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(auth(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export default auth;
