import React from 'react';
import { Navigate, Route } from 'react-router-dom';
// recoil
import { useRecoilState } from 'recoil';
import { token } from 'store/index'

function AuthRoute ({ component: Component, ...rest }) {
  const accessToken = useRecoilState(token.accessToken);

  return (
    <Route
      {...rest}
      render = {props => 
        accessToken
        ? <Component {...props} />
        : <Navigate to="/login" replace={true} />
      }
    />
  )
}

export default AuthRoute;