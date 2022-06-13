import { Box } from '@mui/material';
import SideBarDrawer from '../sideBarDrawer';
import UserMenu from '../userMenu';

interface Props {
  isMideaUp: boolean;
}

const AppHeader = ({ isMideaUp }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isMideaUp ? 'flex-end' : 'space-between',
        m: 2
      }}
    >
      {!isMideaUp && <SideBarDrawer />}
      <UserMenu />
    </Box>
  );
};

export default AppHeader;
