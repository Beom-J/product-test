import { useMutation } from 'react-query';
import axios from 'axios';

function useOAuthToken() {
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const params = { email, password };

      const { data } = await axios.post(`api/login`, params, config);

      return data;
    }
  );
}

export { useOAuthToken };
