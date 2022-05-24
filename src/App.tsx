import queryClient from './plugins/queryClient';

import { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';

import LoginPage from './pages/login';
import { accessToken } from './plugins/axios';
import Dashboard from './pages/dashboard';
import Toast from './components/ui/toast';

function App() {
  const [hasAccessToken, setHasAccessToken] = useState<boolean>(false);

  useEffect(() => {
    // 앱 로딩 시 토큰 저장되어있는지 확인
    if (accessToken !== undefined) {
      setHasAccessToken(true);
    }
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {!hasAccessToken ? <LoginPage /> : <Dashboard />}
        <Toast />
      </QueryClientProvider>
    </div>
  );
}

export default App;
