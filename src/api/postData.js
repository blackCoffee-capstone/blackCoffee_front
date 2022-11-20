// axios
import defaultAxios from './defaultAxios'
// import authAxios from './authAxios'

// payload
async function postData({
  url,
  payload,
  callback = () => {},
  header = {},
  auth,
  ...options
}) {
  // 실질적으로 데이터 보내는 함수
  const sendData = () => { 
    if(!auth){ // 유저 인증 필요 없는 경우
      return defaultAxios.post(url, payload, {
        headers: { ...header }
      })
    } else {  // 유저 인증 필요한 경우
      // return authAxios.post(url, payload, {
      //   headers:{
      //     ...header,
      //     // authorization: `Bearer ${accessToken}`,
      //   },
      // })
    }
  }

  try {
    const res = await sendData();
    console.log(res)
    callback(res.data);
  } catch (error) {
    console.error('데이터를 보내는데 실패했습니다.');
    console.error(error);
  }
}

export default postData