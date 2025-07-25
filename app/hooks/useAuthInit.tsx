'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginMemberData } from '../store/isLogin/loginSlice';
import { GetLoginMemberData, RefreshToken } from '../services/login/refreshToken';

export default function AuthInitProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const memberData = await GetLoginMemberData();

      if (memberData.accessToken && memberData.refreshToken) {
        dispatch(setLoginMemberData({ ...memberData.user }));
      }

      if (memberData.message === '토큰이 없습니다') {
        const refreshResponse = await RefreshToken({
          ...memberData.user,
          password: '',
          created_at: memberData.createdAt,
          updated_at: '',
          deleted_at: '',
        });

        dispatch(setLoginMemberData({ ...refreshResponse }));
      }
    };

    init();
  }, [dispatch]);

  return null;
}
