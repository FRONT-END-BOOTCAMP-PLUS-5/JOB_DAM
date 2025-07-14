import CryptoJS from 'crypto-js';

const PASSWORD_SECRET_KEY = process.env.NEXT_PUBLIC_PASSWORD_SECRET_KEY;

export const passwordCrypto = (password: string): string => {
  return CryptoJS.AES.encrypt(password, PASSWORD_SECRET_KEY || '').toString();
};

export const passwordDecrypto = (encryptedPassword: string): string => {
  return CryptoJS.AES.decrypt(encryptedPassword, PASSWORD_SECRET_KEY || '').toString(CryptoJS.enc.Utf8);
};
