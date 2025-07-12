'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const path_name = usePathname();
  const is_auth_page = path_name === '/login' || path_name === '/signup';

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
      <>
        <Header />
        <Container>{children}</Container>
        <Footer />
      </>
    </>
  );
}
