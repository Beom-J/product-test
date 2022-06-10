import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import NavCloseIcon from '@mui/icons-material/CloseRounded';
import { SidebarListData } from './SidebarListData';
import SubMenu from '../subMenu';

type Props = {
  open: boolean;
};

const SidebarNav = styled.nav<Props>`
  background: #eff5f8;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* position: fixed; */
  top: 0;
  left: ${({ open }) => (open ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SidebarNav open={open}>
      <SidebarWrap>
        <NavIcon to="#">
          <NavCloseIcon onClick={handleClick} />
        </NavIcon>
        {SidebarListData.map((item, index) => (
          <SubMenu {...item} key={`item-${index}`} />
        ))}
      </SidebarWrap>
    </SidebarNav>
  );
};

export default SideBar;
