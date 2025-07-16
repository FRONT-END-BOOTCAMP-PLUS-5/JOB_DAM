import CryptoJS from 'crypto-js';

export const passwordCrypto = (password: string): string => {
  return CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString();
};

export const passwordDecrypto = (encryptedPassword: string): string => {
  return CryptoJS.AES.decrypt(encryptedPassword, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString(
    CryptoJS.enc.Utf8,
  );
};
