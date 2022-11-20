// axios
import defaultAxios from './defaultAxios'

function getRecommendListApi(
  accessToken,
  callback=()=>{}
) {
  defaultAxios.get(`recommendations/list`, {
    headers:{
      authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res=>{
    callback(res.data)
  })
  .catch(error=>{
    console.log('recommendation', error);
  })
}

export default getRecommendListApi