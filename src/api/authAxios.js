// core
import { useEffect, useState, useCallback } from "react";
// axios
import axios from "axios";
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil'
import { token, messageBundle } from 'store/index'

// token 사용하는 auth instance 시작
const auth = axios.create({
  baseURL: 'https://www.jigeumyeogi.site/',
});
auth.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
auth.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
auth.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';

// 토큰 만료 후 요청 저장 작업
let isTokenRefreshing = false;
let refreshSubscribers = [];
const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// auth interceptor custom hook
function AuthAxiosInterceptor({children}){
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);
  const [ refreshToken, setRefreshToken ] = useRecoilState(token.refreshToken);
  const setAlert = useSetRecoilState(messageBundle.alert);

  // intercepter 삽입
  useEffect(() => {
    // const requestIntercept = auth.interceptors.request.use(
    //   config => {
    //     // auth.defaults.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : '';
    //     config.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : '';
    //     return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   }
    // );
    const responseIntercept = auth.interceptors.response.use(
      response => response, 
      async (error) => {
        const { config: originalRequest, response: { status } } = error;
        if(status === 401){
          refreshSubscribers = [];
          if (!isTokenRefreshing) {
            isTokenRefreshing = true;
            if(!refreshToken) {
              setAlert('토큰이 만료되었습니다. 다시 로그인 해 주세요');
              setAccessToken('');
              return;
            }
            // token refresh 요청
            const { data } = await auth.post(`auth/token-refresh`, {
              refreshToken: refreshToken
            });
            // 새로운 토큰 저장
            setAccessToken(data.accessToken);
            isTokenRefreshing = false;
            // auth.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
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
    return () => {
      // auth.interceptors.response.eject(requestIntercept);
      auth.interceptors.response.eject(responseIntercept);
    }
  }, [refreshToken, isTokenRefreshing])

  return children
}

export default auth;
export {AuthAxiosInterceptor};