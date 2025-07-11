import jwt from 'jsonwebtoken';

export const verifyAccessToken = (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    return decode as { userId: string };
  } catch (error) {
    throw new Error('액세스 토큰이 만료되었습니다.');
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    return decode as { userId: string };
  } catch (error) {
    throw new Error('리프레시 토큰이 만료되었습니다.');
  }
};
