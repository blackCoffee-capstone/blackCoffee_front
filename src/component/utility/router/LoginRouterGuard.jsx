// router
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { token, messageBundle } from 'store/index'

// 로그인 했다면 못들어가도록 router-guard
function AuthRouterGuard({ children }) {
  const accessToken = useRecoilValue(token.accessToken);
  const setAlert = useSetRecoilState(messageBundle.alert);

  useEffect(()=>{
    if(accessToken){
      setAlert('이미 로그인 하셨습니다.');
    }
  })
  if(accessToken) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default AuthRouterGuard