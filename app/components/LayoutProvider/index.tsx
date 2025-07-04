'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isAuthPage = pathName === '/login' || pathName === '/signup';

  if (isAuthPage) {
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
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
