import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { SidebarIcons, SidebarListType } from '../sideBar/SidebarListData';
import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';

const SidebarLink = styled(Link)`
  display: flex;
  color: #78778f;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #ffffff;
    color: #036dff;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #eff5f8;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #78778f;
  font-size: 18px;
  &:hover {
    background: #ffffff;
    color: #036dff;
    cursor: pointer;
  }
`;

const SubMenu = ({ title, path, subNav, icon }: SidebarListType) => {
  const Icon = SidebarIcons[icon];
  const [openSubNav, setOpenSubnav] = useState(false);
  const [MoreIcon, setMoreIcon] = useState(<ExpandMoreRounded />);

  const showSubnav = () => setOpenSubnav(!openSubNav);
  const hasSubnav = !!subNav.length;

  useEffect(() => {
    setMoreIcon(openSubNav ? <ExpandLessRounded /> : <ExpandMoreRounded />);
  }, [openSubNav]);

  return (
    <>
      <SidebarLink to={path} onClick={subNav && showSubnav}>
        <>
          <Icon />
          <SidebarLabel>{title}</SidebarLabel>
        </>
        {hasSubnav && MoreIcon}
      </SidebarLink>
      {openSubNav &&
        subNav?.map((item, index) => {
          const Icon = SidebarIcons[item.icon];
          return (
            <DropdownLink to={item.path} key={index}>
              <>
                <Icon />
                <SidebarLabel>{item.title}</SidebarLabel>
              </>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
