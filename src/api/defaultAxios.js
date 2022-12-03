// axios
import axios from "axios";

// 기본 axios instance
const basic = axios.create({
  baseURL: 'https://www.jigeumyeogi.site/',
});
basic.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
basic.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
basic.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
export default basic;
