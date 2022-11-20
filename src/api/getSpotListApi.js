// axios
import defaultAxios from './defaultAxios'

function getSpotListApi(params={}, callback=()=>{}) {
  defaultAxios.get('spots', {
    params: params,
  })
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    console.log('리스트', error);
  })
}

export default getSpotListApi