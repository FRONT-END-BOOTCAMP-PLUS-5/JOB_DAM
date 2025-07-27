import styles from '@/app/components/common/LoginForm/loginForm.module.scss';

export interface LoginItemType {
  label: string;
  type: 'email' | 'password' | 'text';
  required: boolean;
  name: 'email' | 'password';
  placeholder: string;
  className: string;
  containerClassName: string;
  pattern?: RegExp;
  errorMessage: string;
}

export const LoginItem: LoginItemType[] = [
  {
    label: '이메일',
    type: 'email',
    required: true,
    name: 'email',
    placeholder: '이메일을 입력해주세요.',
    className: styles.login_form_input,
    containerClassName: styles.login_form_item,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: '이메일 형식이 올바르지 않습니다.',
  },

  {
    label: '비밀번호',
    name: 'password',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 입력해주세요.',
    className: styles.login_form_input,
    containerClassName: styles.login_form_item,
    pattern: /^(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]{8,15}$/,
    errorMessage: '비밀번호는 특수문자 포함해서 8글자이상 15이하로 작성해주세요.',
  },
];
