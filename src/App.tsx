import { Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { ErrorBoundary } from '@sentry/react';
import { createTheme, ThemeProvider } from '@mui/material';

import queryClient from './plugins/queryClient';
import Toast from './components/ui/toast';

import Router from './route';

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading....</div>}>
            <Router />
            <Toast />
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
