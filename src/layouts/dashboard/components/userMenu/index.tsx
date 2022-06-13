import React, { useState } from 'react';

import { Avatar, Box, Button, Fade, Menu, MenuItem } from '@mui/material';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={<Avatar />}
      >
        User
      </Button>
      <Menu
        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
      >
        <MenuItem>정보 설정</MenuItem>
        <MenuItem>로그아웃</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
