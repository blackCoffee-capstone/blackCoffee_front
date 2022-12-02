// core
import { useEffect } from 'react';
// axios
import authAxios from './authAxios'
// react-query
import { useMutation } from "@tanstack/react-query";
// recoil
import { useRecoilState } from 'recoil'
import { token } from 'store/index'

function useAuthPost({ url }) {
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);
  const [ refreshToken, setRefreshToken ] = useRecoilState(token.refreshToken);

  // axios interceptor 삽입
  useEffect(() => {
    const responseIntercept = authAxios.interceptors.response.use(
      response => response, 
      async (error) => {
        // 토큰이 만료되었을 때 새로운 토큰을 발급하는 역할
        const prevRequest = error?.config;
        if(error?.response?.status === 401 && !prevRequest?.sent) {
          console.log('토큰만료');
          prevRequest.sent = true;
          const response = await authAxios.post('/auth/token-refresh', {
            refreshToken: refreshToken
          });
          const newAccessToken = response.data.accessToken;
          setAccessToken(newAccessToken);
          prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          return authAxios(prevRequest)
        }
      }
    );
    return () => {
      authAxios.interceptors.response.eject(responseIntercept);
    }
  }, [accessToken, refreshToken])

  return useMutation(
    (payload) => authAxios.post(url, payload, {
      headers:{
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: e => {
        console.log(e.message);
      }
    }
  );
}

export default useAuthPost