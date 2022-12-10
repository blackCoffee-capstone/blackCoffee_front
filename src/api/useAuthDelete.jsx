// axios
import authAxios from './authAxios'
// react-query
import { useMutation } from "@tanstack/react-query";
// recoil
import { useRecoilState } from 'recoil'
import { token } from 'store/index'

function useAuthDelete({ url, ...props }) {
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);

  return useMutation(
    () => authAxios.delete(url, {
      headers:{
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: e => {
        console.log(e.message);
      },
      ...props
    }
  );
}

export default useAuthDelete