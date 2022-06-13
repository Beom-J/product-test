import { Box, Grid } from '@mui/material';
import UserCard from '../../layouts/dashboard/components/card/userCard';

function Dashboard() {
  return (
    <Box
      sx={{
        p: 2
      }}
    >
      <Grid container spacing={2}>
        <UserCard />
        <UserCard />
      </Grid>
    </Box>
  );
}

export default Dashboard;
