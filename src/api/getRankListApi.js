// axios
import defaultAxios from './defaultAxios'

function getRankListApi(params={}, callback=()=>{}) {
  defaultAxios.get('ranks/list', {
    params: params,
  })
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    console.log('리스트', error);
  })
}

export default getRankListApi