// axios
import axios from './defaultAxios'
// react-query
import { useMutation } from "@tanstack/react-query";

function usePost({ url }) {
  return useMutation(
    (payload) => axios.post(url, payload),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: (error, variables, context) => {
        console.log('에러', error.message, context.id);
      },
    }
  );
}

export default usePost