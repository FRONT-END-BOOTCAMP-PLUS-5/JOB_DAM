import { useState } from 'react';
import styles from './input.module.scss';
import { Path, UseFormRegister, FieldValues } from 'react-hook-form';
import Image from 'next/image';

interface InputProps<T extends FieldValues> {
  label: string;
  required?: boolean;
  name: Path<T>;
  placeholder: string;
  className: string;
  containerClassName?: string; // 컨테이너 스타일링용 추가
  register: UseFormRegister<T>;
  errors?: any;
  pattern?: RegExp;
  errorMessage?: string;
  passwordCheckPattern?: boolean;
  type?: string;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  required = false,
  placeholder,
  className,
  containerClassName = '', // 기본값 설정
  register,
  errors,
  pattern,
  errorMessage,
  passwordCheckPattern,
  type = 'text',
}: InputProps<T>) {
  const login_form_label = label === '이메일' || label === '비밀번호' ? styles.login_form_label : '';
  const [showPassword, setShowPassword] = useState(false);

  // 검증 규칙 동적 생성
  const validationRules: any = {};
  if (required) validationRules.required = `${label}을 입력해주세요`;

  // pattern이 RegExp인 경우
  if (pattern) {
    validationRules.pattern = { value: pattern, message: errorMessage || `${label} 형식이 올바르지 않습니다` };
  }

  // 실제 input type 결정 - 원래 타입이 password이고 showPassword가 true일 때만 text로 변경
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`${styles.input_container} ${styles[name]} ${containerClassName}`}>
      <label className={login_form_label}>{label}</label>
      <div className={styles.input_wrapper}>
        <input {...register(name, validationRules)} className={className} placeholder={placeholder} type={inputType} />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggle_password_button}
          >
            <Image
              src={showPassword ? '/images/show_password.svg' : '/images/no_show_image.svg'}
              alt="eye"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      {errors?.[name] && <span className={styles.error_message}>{errors[name].message}</span>}
      {name === 'password_check' && passwordCheckPattern === false && !errors?.[name] && (
        <span className={styles.error_message}>{errorMessage}</span>
      )}
    </div>
  );
}
