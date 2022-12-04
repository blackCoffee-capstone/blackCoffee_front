// axios
import axios from './defaultAxios'
// react-query
import { useQuery } from "@tanstack/react-query";
// recoil
import { useSetRecoilState } from 'recoil'
import { messageBundle } from 'store/index'

function useFetch({ url, key, params={}}) {
  const setAlert = useSetRecoilState(messageBundle.alert);

  const { data, isError, isLoading, error, refetch } = useQuery(
    key,
    () => axios.get(url, {
      params: params
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

  return { data: data?.data, isLoading, refetch };
}

export default useFetch