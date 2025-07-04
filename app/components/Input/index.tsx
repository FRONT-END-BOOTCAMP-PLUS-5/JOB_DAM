import styles from '@/app/components/LoginForm/loginForm.module.scss';
import { Path, useForm } from 'react-hook-form';

interface IFormValues {
  email: string;
  password: string;
  nickname: string;
}

interface InputProps {
  label: string;
  required: boolean;
  name: Path<IFormValues>;
  placeholder: string;
  className: string;
}

export default function Input({ name, label, required, placeholder, className }: InputProps) {
  const { register } = useForm<IFormValues>();

  const LoginFormLabel = label === '이메일' || '비밀번호' ? styles.loginFormLabel : styles.loginFormLabel;
  const inputContainer = label === '이메일' || '비밀번호' ? styles.rowInputContainer : styles.columnInputContainer;

  return (
    <div className={inputContainer}>
      <label className={LoginFormLabel}>{label}</label>
      <input {...register(name, { required })} className={className} placeholder={placeholder} />
    </div>
  );
}
