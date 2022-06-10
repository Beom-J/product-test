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

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SidebarNav open={open}>
      <SidebarWrap>
        {SidebarListData.map((item, index) => (
          <SubMenu {...item} key={`item-${index}`} />
        ))}
      </SidebarWrap>
    </SidebarNav>
    // TODO sidebar 접었다 펼쳤다 할 수 잇는 아이콘 & 메뉴 표현방식 고민...
  );
};

export default SideBar;
