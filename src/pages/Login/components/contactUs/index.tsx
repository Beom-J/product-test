import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const ContactUs = () => {
  return (
    // <Box sx={{ marginTop: 2 }}>
    //   <Paper elevation={3}>
    //     <Typography variant="h5">이용문의</Typography>
    //   </Paper>
    // </Box>
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          이용 문의
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          service@ierp.co.kr
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (주) 가치브라더
          <br />
          대표자 : 임규성
          <br />
          주소 : 서울특별시 마포구 어울마당로 35 신보빌딩 6층
          <br />
          대표전화 : 02-546-7946
          <br />
          사업자번호 : 119-86-81107
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContactUs;
