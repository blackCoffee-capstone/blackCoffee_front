// axios
import auth from 'axios'

function getSpotApi(id, callback=()=>{}) {
  auth.get(`spots/${id}`)
  .then(res=>{
    callback(res.data)
  })
  .catch(error=>{
    console.log('spots/:id', error);
  })
}

export default getSpotApi