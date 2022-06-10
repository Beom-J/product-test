import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';

import AppHeader from './components/header';
import SideBar from './components/sideBar';
import SideBarDrawer from './components/sideBarDrawer';

const Styler = styled.div`
  display: flex;
`;

const DashboardLayout = () => {
  // width 600px 이하일때 사이드바 감추기
  const isMideaUp = useMediaQuery('(min-width:600px)');

  return (
    <Styler>
      {isMideaUp && <SideBar />}
      {!isMideaUp && <SideBarDrawer />}
      <AppHeader />
      <div style={{ background: 'blue' }}>
        <Outlet />
      </div>
    </Styler>
  );
};

export default DashboardLayout;
