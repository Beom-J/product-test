import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import IErpLogo from '../../asset/login_logo.png';

import { Auth } from '../../models';
import ContactUs from './components/contactUs';

export default function LoginPage() {
  const useOAuthToken = Auth.Mutation.useOAuthToken();
  const navigate = useNavigate();

  const [showContact, setShowContact] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    useOAuthToken.mutate(
      {
        email,
        password
      },
      {
        onSuccess: (data) => {
          console.log('data:::', data);
          axios.defaults.headers.Authorization = `Bearer ${data.access_token}`;

          cookie.set('access_token', data.access_token);
          toast.success('로그인 성공');
          navigate('/dashboard');
        },
        onError: (error) => {
          console.log(error);
          toast.error('로그인 실패');
        }
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img src={IErpLogo} />
        <Typography sx={{ marginTop: 2 }} component="h1" variant="h5">
          관리시스템
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Link
                variant="body2"
                onClick={() => setShowContact(!showContact)}
              >
                {'이용문의'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {showContact && <ContactUs />}
    </Container>
  );
}
