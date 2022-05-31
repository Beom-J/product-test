import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  }
});

export default queryClient;
