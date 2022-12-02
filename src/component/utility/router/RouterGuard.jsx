// router
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// recoil
import { useSetRecoilState } from 'recoil';
import { messageBundle } from 'store/index'

// router-guard
function RouterGuard({
  isAllowed='false',
  redirectPath='/',
  callback=()=>{},
  children
}) {
  const alert = useSetRecoilState(messageBundle.alert);
  useEffect(()=>{
    if(!isAllowed) { callback() }
  })
  if(!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return children;
}

export default RouterGuard