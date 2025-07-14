'use client';

import { store } from '@/app/store/store';
import React from 'react';
import { Provider } from 'react-redux';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
