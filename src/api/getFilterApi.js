// axios
import defaultAxios from './defaultAxios'

function getFilterApi(callback=()=>{}) {
  defaultAxios.get('filters')
  .then(res=>{
    callback(res.data);
  })
  .catch(error=>{
    console.log('필터', error);
  })
}

export default getFilterApi