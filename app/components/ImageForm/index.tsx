import Image from 'next/image';
import React from 'react';
import styles from './imageForm.module.scss';

export default function ImageForm() {
  const handle_image_upload = () => {};

  return (
    <div className={styles.imageFormContainer}>
      <div className={styles.uploadImageContainer}>
        <Image src={'/images/userImage.svg'} alt="유저 이미지" width={40} height={40} className={styles.signup_image} />
        <Image
          src={'/images/file.svg'}
          alt="유저 이미지"
          width={20}
          height={20}
          className={styles.uploadImage}
          onClick={handle_image_upload}
        />
      </div>
      <div className={styles.nickname_input_container}>
        <label>닉네임</label>
        <input type="text" placeholder="닉네임을 입력해주세요" className={styles.signup_form_item} />
      </div>
    </div>
  );
}
