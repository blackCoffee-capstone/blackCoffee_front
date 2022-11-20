// axios
import defaultAxios from './defaultAxios'

function getUserApi(
  accessToken,
  callback=()=>{},
  params={}
) {
  defaultAxios.post('users', {
    params: params
  }, {
    headers:{
      authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    console.log('get /users', error);
  })
}

export default getUserApi