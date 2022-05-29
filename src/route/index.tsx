import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';

import LoginPage from '../pages/login';
import ProductHeader from '../pages/product';
import NewForm from '../pages/product/component/new';
import ProductTable from '../pages/product/component/table';
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
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<ProductHeader />}>
              <Route index element={<ProductTable />} />
              <Route path="add" element={<NewForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
