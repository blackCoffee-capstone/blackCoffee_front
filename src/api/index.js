// axios
import axios from "axios";
// recoil
import { useRecoilState } from 'recoil';
import { token } from 'store/index'

const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);
const [ refreshToken, setRefreshToken ] = useRecoilState(token.refreshToken);

// 기본 axios instance
const basic = axios.create({
  baseURL: 'http://49.50.167.136:3000/',
});
// token 사용하는 auth instance 시작
const auth = axios.create({
  baseURL: 'http://49.50.167.136:3000/',
});
// 토큰 만료 후 요청 저장 작업
let isTokenRefreshing = false;
let refreshSubscribers = [];
const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
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
        const { data } = await auth.get(`/token`, {
          params: { refreshToken: refreshToken } 
        });
        // 새로운 토큰 저장
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        isTokenRefreshing = false;
        auth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // 새로운 토큰으로 지연되었던 요청 진행
        onTokenRefreshed(accessToken);
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

export default basic;
export { auth };
