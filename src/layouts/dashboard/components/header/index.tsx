import { Box, Container } from '@mui/material';
import UserMenu from '../userMenu';

const AppHeader = () => {
  return (
    <Box sx={{ textAlign: 'end', m: 2 }}>
      <UserMenu />
    </Box>
  );
};

export default AppHeader;
