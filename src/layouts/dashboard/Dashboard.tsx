import styled from '@emotion/styled';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';

import AppHeader from './components/header';
import SideBar from './components/sideBar';

const Styler = styled.div`
  display: flex;
`;

const DashboardLayout = () => {
  // width 600px 이하일때 사이드바 감추기
  const isMideaUp = useMediaQuery('(min-width:600px)');

  return (
    <Styler>
      {isMideaUp && <SideBar />}
      <Box sx={{ width: '100%', height: '100vh', background: '#eff5f8' }}>
        <AppHeader isMideaUp={isMideaUp} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Styler>
  );
};

export default DashboardLayout;
