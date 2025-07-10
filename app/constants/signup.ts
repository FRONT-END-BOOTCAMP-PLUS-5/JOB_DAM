const TOAST_MESSAGES = {
  SUCCESS: '회원가입에 성공했습니다!',
  DUPLICATE_EMAIL: '이미 존재하는 이메일입니다.',
  DUPLICATE_NICKNAME: '이미 존재하는 닉네임입니다.',
  DUPLICATE_NAME: '이미 가입하신 이름입니다.',
  GENERAL_ERROR: '회원가입에 실패했습니다.',
  TERMS_ERROR: '필수 약관에 동의해주세요!',
  NETWORK_ERROR: '회원가입 중 오류가 발생했습니다.',
  DUPLICATE_ERROR: '이미 존재하는 회원입니다.',
} as const;

const FORM_DEFAULT_VALUES = {
  service_terms: false,
  privacy_terms: false,
  marketing_terms: false,
} as const;

export { TOAST_MESSAGES, FORM_DEFAULT_VALUES };
