// router
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { token, messageBundle } from 'store/index'

// 로그인 해야 들어갈 수 있도록 router-guard
function AuthRouterGuard({ children }) {
  const accessToken = useRecoilValue(token.accessToken);
  const setAlert = useSetRecoilState(messageBundle.alert);

  useEffect(()=>{
    if(!accessToken){
      setAlert('로그인이 필요합니다.');
    }
  })
  if(!accessToken) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}

export default AuthRouterGuard