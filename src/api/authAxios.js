// axios
import axios from "axios";

// token 사용하는 auth instance 시작
const auth = axios.create({
  baseURL: 'https://www.jigeumyeogi.site/',
});
export default auth;
