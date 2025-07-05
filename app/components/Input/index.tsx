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

  const login_form_label = label === '이메일' || '비밀번호' ? styles.login_form_label : styles.login_form_label;
  const input_container = label === '이메일' || '비밀번호' ? styles.row_input_container : styles.column_input_container;

  return (
    <div className={input_container}>
      <label className={login_form_label}>{label}</label>
      <input {...register(name, { required })} className={className} placeholder={placeholder} />
    </div>
  );
}
