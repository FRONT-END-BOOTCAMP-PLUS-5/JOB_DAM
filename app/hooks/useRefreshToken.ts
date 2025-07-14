import { useEffect } from 'react';
import { RefreshToken } from '../services/login/refreshToken';

export const useRefreshToken = () => {
  useEffect(() => {
    const refreshToken = async () => {
      const response = await RefreshToken();

      return response.data;
    };

    const interval = setInterval(refreshToken, 1000 * 60 * 14);

    return () => clearInterval(interval);
  }, []);
};
