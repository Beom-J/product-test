import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate('/login');
  };
  return (
    <div>
      <h1>Home 입니다 public 이죠</h1>

      <Button type="button" variant="contained" onClick={handleClickLogin}>
        log in
      </Button>
    </div>
  );
};

export default Home;
