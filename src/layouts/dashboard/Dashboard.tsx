import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import AppHeader from './components/header';
import SideBar from './components/sideBar';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

const Styler = styled.div`
  display: flex;
`;

const DashboardLayout = () => {
  const navigate = useNavigate();

  const isMideaUp = useMediaQuery('(min-width:600px)');

  return (
    <Styler>
      {/* {isMideaUp && <SideBar />} */}
      <SideBar />
      <AppHeader />
      <div style={{ background: 'blue' }}>content</div>
    </Styler>
  );
};

export default DashboardLayout;
