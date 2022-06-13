import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import EjectRoundedIcon from '@mui/icons-material/EjectRounded';
import AddchartRoundedIcon from '@mui/icons-material/AddchartRounded';
import styled from '@emotion/styled';

type Props = {
  direction: 'left' | 'right';
};

const SectionStyler = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ direction }) =>
    direction === 'left' ? 'space-between' : 'center'};
  padding: 10px;
  align-items: ${({ direction }) => (direction === 'left' ? 'left' : 'center')};
`;

const UserCard = () => {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          boxShadow: 'none'
        }}
      >
        <CardActionArea onClick={() => console.log('card click')}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 'max-content'
            }}
          >
            <SectionStyler direction="left">
              <Typography variant={'h5'}>등록 원수</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="inherit" color={'GrayText'}>
                  지난 달 대비
                </Typography>
                <EjectRoundedIcon color="info" />
                20%
              </Box>
              <Typography variant="h5" sx={{ marginTop: '10px' }}>
                123456
              </Typography>
            </SectionStyler>

            <SectionStyler direction="right">
              <AddchartRoundedIcon color="info" fontSize="large" />
            </SectionStyler>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default UserCard;
