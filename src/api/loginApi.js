// axios
import defaultAxios from './defaultAxios'

function loginApi(
  payload,
  callback=()=>{},
) {
  defaultAxios.post('auth/login', payload)
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    if(error.response.status==404) {
      alert('유저 정보를 다시 입력해주세요')
    }
  })
}

export default loginApi