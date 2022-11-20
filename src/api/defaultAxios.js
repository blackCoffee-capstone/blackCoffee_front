// axios
import axios from "axios";

// 기본 axios instance
const basic = axios.create({
  baseURL: 'http://49.50.167.136:3000/',
});

export default basic;
