// axios
import defaultAxios from './defaultAxios'

function postTasteApi(
  accessToken,
  payload,
  callback=()=>{}
) {
  defaultAxios.post('users/taste-themes', payload, {
    headers:{
      authorization: `Bearer ${accessToken}`,
    },
  })
  .then(()=>{
    callback();
  })
  .catch(error=>{
    console.log('취향선택 전송', error);
  })
}

export default postTasteApi