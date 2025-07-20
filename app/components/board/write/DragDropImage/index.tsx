'use client'
import style from "./dragDropImage.module.scss"
import Button from '@/app/components/common/Button';
import { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import FileImage from '../FileImage';
import { Slide, toast } from 'react-toastify';

interface IProps {
  setSelectedFiles:   Dispatch<SetStateAction<File[]>>
  selectedFiles: File[]
  setPreviewUrls: Dispatch<SetStateAction<string[]>>
  previewUrls: string[]
}

export default function DragDropImage({ setSelectedFiles, selectedFiles, setPreviewUrls, previewUrls }:IProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleInputFile = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    fileRef.current?.click()
  }

  const handleFileChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const newFiles = Array.from(evt.target.files);
      const filesToAdd: File[] = [];
      const duplicateFileNames: string[] = [];

      newFiles.forEach(newFile => {
        const isDuplicate = selectedFiles.some(existingFile => existingFile.name === newFile.name);

        const isDuplicateInNewFiles = filesToAdd.some(fileInQueue => fileInQueue.name === newFile.name);

        if (isDuplicate || isDuplicateInNewFiles) duplicateFileNames.push(newFile.name);
        else filesToAdd.push(newFile);
      });

      if (duplicateFileNames.length > 0) {
        toast.error(`다음 파일명은 이미 존재합니다: ${duplicateFileNames.join(', ')}. 중복 파일은 추가되지 않습니다.`, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
          transition: Slide,
          toastId: 1,
        });
      }

      const totalFiles = [...selectedFiles, ...filesToAdd];

      if (totalFiles.length > 3) {
        toast.error('최대 3개의 이미지만 업로드할 수 있습니다. 초과된 파일은 추가되지 않습니다.', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
          transition: Slide,
          toastId: 1,
        });
        setSelectedFiles(totalFiles.slice(0, 3));
      } else {
        setSelectedFiles(totalFiles);
      }

      evt.target.value = '';
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  }

  useEffect(() => {
    const newPreviewUrls: string[] = [];
    selectedFiles.forEach(file => {
      newPreviewUrls.push(URL.createObjectURL(file));
    });
    setPreviewUrls(newPreviewUrls);

    return () => {
      newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);





  return (
    <>
      <section className={style.container}>
        <input ref={fileRef} type="file" accept="image/*"  multiple className={style.hidden_input} onChange={handleFileChange}/>
        <p>아래 버튼을 클릭해서 업로드 하세요</p>
        <Button text={'Choose File'} type={'choose'} onClick={(evt) => {handleInputFile(evt)}}/>
     </section>
      <FileImage previewUrls={previewUrls} onRemove={(idx) => handleRemoveImage(idx)}/>
    </>
  );
};