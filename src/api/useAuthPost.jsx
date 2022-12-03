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