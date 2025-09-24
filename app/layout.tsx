import type { Metadata } from 'next';
import './globals.css';
import LayoutProvider from './components/common/LayoutProvider';
import { ReduxProvider } from './components/common/reduxProvider';

export const metadata: Metadata = {
  title: 'JOB DAM',
  description:
    'JOB DAM은 멘토와 멘티가 함께 성장하는 커리어 플랫폼입니다. 멘토링, 1:1 채팅, 게시판을 통해 커리어 고민을 해결해 보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
