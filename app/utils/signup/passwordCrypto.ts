import CryptoJS from 'crypto-js';

export const passwordCrypto = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};

export const passwordDecrypto = (encryptedPassword: string): string => {
  return CryptoJS.SHA256(encryptedPassword).toString(CryptoJS.enc.Utf8);
};
