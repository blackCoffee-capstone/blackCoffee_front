
// axios
import axios from "axios";

// token 사용하는 auth instance
const auth = axios.create({
  baseURL: 'http://49.50.167.136:3000/',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});

export default auth;
