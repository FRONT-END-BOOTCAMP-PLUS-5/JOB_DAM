import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    // example.com 아래의 이미지를 Image 컴포넌트에 표시하기 위해 추가
    domains: ['yqutjsbcupbfpphjmaax.supabase.co'],
  },
  reactStrictMode: false,
};

export default nextConfig;
