import React, { useState } from 'react';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { Box, Button, Drawer } from '@mui/material';
import SideBar from '../sideBar';

const SideBarDrawer = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Box>
      <Button variant="outlined" onClick={() => setOpenSideBar(!openSideBar)}>
        <MenuRoundedIcon />
      </Button>
      <Drawer
        anchor="left"
        open={openSideBar}
        onClose={() => setOpenSideBar(false)}
      >
        <SideBar />
      </Drawer>
    </Box>
  );
};

export default SideBarDrawer;
