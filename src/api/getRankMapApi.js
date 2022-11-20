// axios
import defaultAxios from './defaultAxios'

function getRankMapApi(params={}, callback=()=>{}) {
  defaultAxios.get('ranks/map', {
    params: params,
  })
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    console.log('지도', error);
  })
}

export default getRankMapApi