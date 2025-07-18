'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';
import { Suspense } from 'react';
import AuthInitProvider from '@/app/hooks/useAuthInit';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  AuthInitProvider();
  const path_name = usePathname();
  const is_auth_page = path_name === '/login' || path_name === '/signup';
  const is_forgot_password_page = path_name === '/find/password' || path_name === '/reset/password';

  if (is_forgot_password_page) {
    return <>{children}</>;
  }

  if (is_auth_page) {
    return (
      <>
        <Header />
        <Container>{children}</Container>
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
