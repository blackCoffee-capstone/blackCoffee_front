// axios
import defaultAxios from './defaultAxios'
// import authAxios from './authAxios'

async function fetchData({
  url,
  callback = () => {},
  params={},
  auth,
  ...options
}) {
  // 실질적으로 데이터 받아오는 함수
  const getData = () => { 
    if(!auth){ // 유저 인증 필요 없는 경우
      return defaultAxios.get(url, {
        params: params,
      })
    } else {  // 유저 인증 필요한 경우
      // return tokenAxios.get(url, payload, {
      //   headers:{
      //     authorization: `Bearer ${accessToken}`,
      //   },
      //   params: params,
      // })
    }
  }

  try {
    const res = await getData();
    callback(res.data);
  } catch (error) {
    console.error('데이터를 가져오는데 실패했습니다.');
    console.error(error);
  }
}

export default fetchData