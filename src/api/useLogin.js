// react-query
import { useQuery } from '@tanstack/react-query'
// axios
import defaultAxios from './defaultAxios'

function useLogin(initialForm) {
  const { status, data, error } = useQuery("login", defaultAxios);
  return [ status, data, error ];
}

export default useLogin