// axios
import defaultAxios from './defaultAxios'

function signupApi(
  payload, 
  callback=()=>{}
) {
  defaultAxios.post('auth/signup', payload)
  .then(res=>{
    callback(res);
  })
  .catch(error=>{
    if (error.response.status==404) {
      alert('회원 정보를 다시 입력해주세요')
    }
  })
}

export default signupApi