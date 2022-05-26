import { QueryClientProvider } from 'react-query';

import queryClient from './plugins/queryClient';
import Toast from './components/ui/toast';

import Router from './route';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
