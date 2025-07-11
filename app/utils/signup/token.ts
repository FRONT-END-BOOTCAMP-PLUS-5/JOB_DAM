// utils/jwt.ts
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET이 설정되지 않았습니다');
  }

  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET as string, // ✅ 타입 캐스팅
    { expiresIn: '15m' },
  );
};

export const generateRefreshToken = (userId: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET이 설정되지 않았습니다');
  }

  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET as string, // ✅ 타입 캐스팅 추가
    { expiresIn: '7d' },
  );
};
