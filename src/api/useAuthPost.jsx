// axios
import authAxios from './authAxios'
// react-query
import { useMutation } from "@tanstack/react-query";
// recoil
import { useRecoilValue } from 'recoil'
import { token } from 'store/index'

function useAuthPost({ url, ...props }) {
  const accessToken = useRecoilValue(token.accessToken);

  return useMutation(
    (payload) => authAxios.post(url, payload, {
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

export default useAuthPost