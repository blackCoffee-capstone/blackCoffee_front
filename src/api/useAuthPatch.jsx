// axios
import authAxios from './authAxios'
// react-query
import { useMutation } from "@tanstack/react-query";
// recoil
import { useRecoilState } from 'recoil'
import { token } from 'store/index'

function useAuthPost({ url, ...props }) {
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);

  return useMutation(
    (payload) => authAxios.patch(url, payload, {
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
      },
      ...props
    }
  );
}

export default useAuthPost