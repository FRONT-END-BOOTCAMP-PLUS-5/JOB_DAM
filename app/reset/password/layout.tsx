import React, { Suspense } from 'react';

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
