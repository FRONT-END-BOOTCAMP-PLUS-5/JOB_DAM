import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styles from './imageForm.module.scss';
import { UseFormRegister, UseFormSetValue, FieldValues, Path, FieldErrors, PathValue } from 'react-hook-form';

interface ImageFormProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  errors?: FieldErrors<T>;
}

export default function ImageForm<T extends FieldValues>({ register, setValue, errors }: ImageFormProps<T>) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handle_image_upload = () => {
    fileInputRef.current?.click();
  };

  const handle_file_change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // 파일이 선택되지 않은 경우
    if (!file) return;

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택해주세요');
      return;
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다');
      return;
    }

    // FileReader로 미리보기 생성
    const reader = new FileReader();

    // 파일 읽기 완료 시 실행
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        setPreviewImage(e.target.result as string);

        // ✅ React Hook Form에 파일 등록 파일 객체로 저장
        if (setValue) {
          setValue('img' as Path<T>, file as PathValue<T, Path<T>>);
        }
      }
    };

    // 파일 읽기 실패 시 실행
    reader.onerror = () => {
      console.error('파일 읽기 실패');
      alert('파일을 읽는 중 오류가 발생했습니다');
    };

    // 파일을 base64 URL로 읽기 시작
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.imageFormContainer}>
      <div className={styles.uploadImageContainer}>
        <Image
          src={previewImage || '/images/userImage.svg'}
          alt="유저 이미지"
          width={40}
          height={40}
          className={styles.signup_image}
        />
        <Image
          src={'/images/file.svg'}
          alt="파일 업로드"
          width={20}
          height={20}
          className={styles.uploadImage}
          onClick={handle_image_upload}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handle_file_change}
        />
      </div>
      <div className={styles.nickname_input_container}>
        <label>닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          className={styles.signup_form_item}
          {...(register?.('nickname' as Path<T>, {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9가-힣]+$/,
              message: '닉네임은 한글, 영문자, 숫자만 사용할 수 있습니다',
            },
            maxLength: {
              value: 10,
              message: '닉네임은 10자 이하여야 합니다',
            },
            minLength: {
              value: 2,
              message: '닉네임은 최소 2글자 이상이여야 합니다',
            },
          }) || {})}
        />
        {errors?.nickname && <span className={styles.error_message}>{errors.nickname.message as string}</span>}
      </div>
    </div>
  );
}
