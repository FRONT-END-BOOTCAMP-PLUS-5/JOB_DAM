import styles from '@/app/components/LoginForm/loginForm.module.scss';
import { Path, UseFormRegister, FieldValues } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  label: string;
  required?: boolean;
  name: Path<T>;
  placeholder: string;
  className: string;
  register: UseFormRegister<T>;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  required = false,
  placeholder,
  className,
  register,
}: InputProps<T>) {
  const login_form_label = label === '이메일' || label === '비밀번호' ? styles.login_form_label : '';

  return (
    <div className={styles.input_container}>
      <label className={login_form_label}>{label}</label>
      <input {...register(name, { required })} className={className} placeholder={placeholder} />
    </div>
  );
}
