import axios from 'axios';

export const RefreshToken = async () => {
  try {
    const response = await axios.post('/api/refresh', {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};
