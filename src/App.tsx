import { QueryClientProvider } from 'react-query';

import queryClient from './plugins/queryClient';
import Toast from './components/ui/toast';

import Router from './route';
import { ErrorBoundary } from '@sentry/react';
import { Suspense } from 'react';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading....</div>}>
          <Router />
          <Toast />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
