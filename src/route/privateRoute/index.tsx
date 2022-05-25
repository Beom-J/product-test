import React, { ReactElement } from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouteProps = {
  children?: ReactElement;
  authentication: boolean; // true: 인증 필요 , false: 인증없어야함
};

const PrivateRoute = ({ authentication }: PrivateRouteProps) => {
  // 로그인 했을 경우 : true
  // 로그인 안한 경우 : false
  const isAuthenticated = !!Cookies.get('access_token');

  if (authentication) {
    // 인증 필요 페이지
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  } else {
    // 인증 없어야 하는 페이지
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
  }
};

export default PrivateRoute;
