// axios
import defaultAxios from './defaultAxios'

// payload
function login(payload) {
  defaultAxios.post('auth/login', payload)
}

export default login