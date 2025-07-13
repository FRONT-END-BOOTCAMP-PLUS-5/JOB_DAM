import jwt, { JwtPayload } from 'jsonwebtoken';

// interface Decode {
//   userId: string;
// }

export const verifyAccessToken = (token: string): JwtPayload | undefined => {
  const secret = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET;
  if (!secret) throw new Error('JWT 시크릿 누락');

  try {
    const decode = jwt.verify(token, secret);
    if (typeof decode === 'string') {
      throw new Error('디코딩 결과가 문자열입니다. 예상과 다릅니다.');
    }

    return decode;
  } catch (error) {
    if (error instanceof Error) throw new Error('액세스 토큰이 만료되었습니다.');
  }

};

export const verifyRefreshToken = (token: string): JwtPayload | undefined => {
  const secret = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT 시크릿 누락');

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      throw new Error('디코딩 결과가 문자열입니다. 예상과 다릅니다.');
    }
    return decoded;
  } catch (error) {
    if (error instanceof Error) throw new Error('리프레시 토큰이 만료되었습니다.');
  }
};
