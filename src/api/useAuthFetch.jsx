// core
import { useEffect } from 'react';
// axios
import authAxios from './authAxios'
// react-query
import { useQuery } from "@tanstack/react-query";
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil'
import { messageBundle, token } from 'store/index'

function useAuthFetch({ url, key, params={}, ...props }) {
  const setAlert = useSetRecoilState(messageBundle.alert);
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);

  const { data, isError, isLoading, error, refetch } = useQuery(
    [ ...key, accessToken ],
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
      },
      ...props
    }
  );
  if(isError){
    console.log('error 발생', error);
  }
  
  return { data: data.data, isLoading, refetch };
}

export default useAuthFetch