import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import styles from '@/app/login/loginForm.module.scss';

interface IFormValues {
  email: string;
  password: string;
}

interface InputProps {
  label: string;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  name: Path<IFormValues>;
  placeholder: string;
}

export default function Input({ name, label, register, required, placeholder }: InputProps) {
  return (
    <>
      <label className={styles.loginFormLabel}>{label}</label>
      <input {...register(name, { required })} className={styles.loginFormItem} placeholder={placeholder} />
    </>
  );
}
