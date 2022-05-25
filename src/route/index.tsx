import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';

import LoginPage from '../pages/login';
import PrivateRoute from './privateRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증과 상관없는 페이지 */}
        <Route index element={<Home />} />

        {/* 인증 안했을때만 접근 가능한 페이지 */}
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* 인증 해야 접근 가능한 페이지 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 권한이 필요한 페이지 */}
          {/* <Route element={<ProtectedRoute/>}>
              <Route path='/admin' element={<AdminMainPage />}/>
              <Route path='/admin/member' element={<ManagerMainPage />}/>
            </Route> */}
        </Route>

        {/* 인증/권한 상관없이 접근 가능한 error 페이지 */}
        {/* <Route path='/*' element={<ErrorPage/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
