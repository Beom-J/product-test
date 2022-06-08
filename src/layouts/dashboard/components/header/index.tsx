import React from 'react';

import {
  AppBar,
  Container,
  createTheme,
  ThemeProvider,
  Toolbar
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#eff5f8'
    }
  }
});

const AppHeader = () => {
  return (
    <Container>
      <div style={{ background: 'green' }}>header</div>
    </Container>
  );
};

export default AppHeader;
