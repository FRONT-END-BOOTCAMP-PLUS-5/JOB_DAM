'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from '@/app/store/isLogin/loginSlice';
import { handleLogin } from '@/app/services/login/login';
import { useAuth } from './useAuth';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (!isLoggedIn) {
          const response = await handleLogin();

          if (response.data.status === 200) {
            // 🔹 Redux에 유저 정보 저장
            dispatch(setLoginState.setLoginMemberData(response.data.user));
          }
        }
        // 🔹 쿠키에 토큰이 있는지 확인하고 유저 정보 가져오기
      } catch (error) {
        // 🔹 토큰이 없거나 만료된 경우 - 아무것도 하지 않음 (로그아웃 상태 유지)
        console.log('토큰 없음 또는 만료됨');
      }
    };

    checkAuthStatus();
  }, [dispatch, isLoggedIn]);
};
