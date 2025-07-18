import { Member } from '@/backend/members/domain/entities/Member';
import axios from 'axios';

interface MemberData extends Member {
  accessToken: string | null;
  refreshToken: string | null;
}

export const RefreshToken = async (member: MemberData) => {
  try {
    const response = await axios.post('/api/refresh', member, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

export const GetLoginMemberData = async () => {
  try {
    const response = await axios.get('/api/login', {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteRefreshToken = async () => {
  try {
    const response = await axios.delete('/api/refresh', {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Delete refresh token error:', error);
    throw error;
  }
};
