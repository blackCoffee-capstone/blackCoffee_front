// axios
import authAxios from './authAxios'
import axios from './defaultAxios'
// react-query
import { useQuery, useMutation } from "@tanstack/react-query";
// recoil
import { useRecoilValue } from 'recoil'
import { token } from 'store/index'

function useApi({ auth=false, method='get', url, params={}, key, ...props }) {
  const accessToken = useRecoilValue(token.accessToken);

  const headerOptions = {
    headers: auth ? { Authorization: accessToken ? `Bearer ${accessToken}` : ''} : {},
  }

  if(method=='get'){  // get 요청시
    return useQuery(  // { data, refetch, isLoading, isError, error }로 받으면 됨
      key,
      () => (auth ? authAxios : axios)({
        url,
        method,
        params,
        ...headerOptions,
      }),
      {
        refetchOnWindowFocus: false, // 재실행 여부 옵션
        retry: 0, // 실패시 재호출 몇번
        onSuccess: data => {  // 성공시
          console.log(url, data);
        },
        onError: e => { // 실패시 호출 (400 같은 error 말고 api 호출이 실패)
          console.log(e.message);
        },
        ...props
      }
    );
  }
  else {  // post, put, patch, delte 요청시
    return useMutation( // { mutate, isLoading }로 받으면 됨
      (data) => (auth ? authAxios : axios)({
        url,
        method,
        data,
        ...headerOptions
      }),
      { 
        onSuccess: data => {  // 성공시
          if(data.data?.result=='ERROR'){
            console.error(url, data);
            throw '에러'
          } else {
            console.log(data);
          }
        },
        onError: e => { // 실패시 호출 (400 같은 error 말고 api 호출이 실패)
          console.log(e.message);
        },
        ...props
      }
    );
  }
}

export default useApi
