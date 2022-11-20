// axios
import defaultAxios from './defaultAxios'

function getTasteApi(
  accessToken,
  callback=()=>{}
) {
  defaultAxios.get('taste-themes', {
    headers:{
      authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    console.log('취향선택', error);
  })
}

export default getTasteApi