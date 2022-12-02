// core
import { useEffect } from 'react';
// axios
import authAxios from './authAxios'
// react-query
import { useQuery } from "@tanstack/react-query";
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil'
import { messageBundle, token } from 'store/index'

function useAuthFetch({ url, key, params={}}) {
  const setAlert = useSetRecoilState(messageBundle.alert);
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

  const { data, isError, isLoading, error, refetch } = useQuery(
    key,
    () => authAxios.get(url, {
      params: params,
      headers:{
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }),
    {
      refetchOnWindowFocus: false, // 재실행 여부 옵션
      retry: 0, // 실패시 재호출 몇번
      onSuccess: data => {  // 성공시
        console.log(data);
      },
      onError: e => { // 실패시 호출 (400 같은 error 말고 api 호출이 실패)
        console.log(e.message);
        setAlert('데이터 호출 중 문제가 발생하였습니다.')
      }
    }
  );
  if(isError){
    console.log('error 발생', error);
  }
  
  return { data: data.data, isLoading, refetch };
}

export default useAuthFetch