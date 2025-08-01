import styles from '@/app/signup/signupPage.module.scss';

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

export const InputItem = [
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력해주세요',
    className: styles.signup_form_item,
    pattern: /^[가-힣]{2,10}$/,
    errorMessage: '이름은 한글만 사용할 수 있습니다',
    required: true,
  },

  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    className: styles.signup_form_item,
    pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
    errorMessage: '이메일 형식이 올바르지 않습니다',
    required: true,
    type: 'email',
  },

  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    className: styles.signup_form_item,
    pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    errorMessage: '비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 15자 이하이어야 합니다',
    required: true,
    type: 'password',
  },

  {
    name: 'password_check',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해주세요',
    className: styles.signup_form_item,
    errorMessage: '비밀번호가 일치하지 않습니다',
    required: true,
    validate: (value: string, passwordInputValue: string) => {
      if (value !== passwordInputValue) {
        return '비밀번호가 일치하지 않습니다';
      }
    },
    type: 'password',
  },
];

export const CheckBoxItem = [
  {
    name: 'service_terms',
    label: '서비스 이용약관',
  },
  {
    name: 'privacy_terms',
    label: '개인정보 처리동의',
  },
  {
    name: 'marketing_terms',
    label: '마케팅 정보 수신 동의',
  },
];
