import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { getAccessToken } from '../../plugins/axios';

const Home = () => {
  const navigate = useNavigate();
  const hasToken = getAccessToken();

  const [introButtonText, setIntroButtonText] = useState('Log in');

  useEffect(() => {
    if (hasToken) {
      console.log(typeof hasToken);
      setIntroButtonText('Welcome!');
    } else {
      setIntroButtonText('Log in');
    }
  }, []);

  const handleClickButton = () => {
    if (hasToken) {
      navigate('/dashboard');
    }
    navigate('/login');
  };
  return (
    <div>
      <h1>Home 입니다 public 이죠</h1>

      <Button type="button" variant="contained" onClick={handleClickButton}>
        {introButtonText}
      </Button>
    </div>
  );
};

export default Home;
