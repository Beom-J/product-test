import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Sample from './components/Sample';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Sample />
      </QueryClientProvider>
    </div>
  );
}

export default App;
