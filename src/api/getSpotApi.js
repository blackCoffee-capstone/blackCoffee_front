// axios
import defaultAxios from './defaultAxios'

function getSpotApi(id, callback=()=>{}) {
  defaultAxios.get(`spots/${id}`)
  .then(res=>{
    callback(res.data)
  })
  .catch(error=>{
    console.log('spots/:id', error);
  })
}

export default getSpotApi