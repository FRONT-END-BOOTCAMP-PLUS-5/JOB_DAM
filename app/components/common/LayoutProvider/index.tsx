'use client';

import { usePathname } from 'next/navigation';
import { useAuthInit } from '@/app/hooks/useAuthInit';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';
import { useRefreshToken } from '@/app/hooks/useRefreshToken';
import { Suspense } from 'react';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const path_name = usePathname();
  const is_auth_page = path_name === '/login' || path_name === '/signup';

  // 🔹 앱 시작 시 토큰 확인하여 유저 정보 복원
  useAuthInit();
  useRefreshToken();

  if (is_auth_page) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <>
      <Header />

      <Container>
        <Suspense>{children}</Suspense>
      </Container>
      <Footer />
    </>
  );
}
