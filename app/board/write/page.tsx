'use client'
import style from "./write.module.scss"
import Input from '@/app/components/board/Input';
import TextArea from '@/app/components/board/write/TextArea';
import DragDropImage from '@/app/components/board/write/DragDropImage';
import Button from '@/app/components/common/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { toast, ToastContainer, Slide } from 'react-toastify';

export default function BoardWrite(){
  const [getTitleVal, setTitleVal] = useState('')
  const [getContentVal, setContentVal] = useState('')
  const [getDisabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const member = useSelector((state: RootState) => state.login.member);

  const router = useRouter()

  const handleWrite = async() => {
    const formData = new FormData()
    setIsLoading(true)
    selectedFiles.forEach((item,idx) => formData.append(`file${idx+1}`, item))

    formData.append("title", getTitleVal)
    formData.append("content", getContentVal)
    formData.append("memberId", member.id) //테스트 계정
    const result= await fetch('/api/question/write', {
      method: "POST",
      body: formData,
    })

    const json = await result.json()
    const id = json.result.question.id
    if(id){
      router.push(`/board/${id}`)
    }
  }

  useEffect(() => {
    if(!member.id){
      toast.error('로그인 후 이용가능 합니다.', {
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
        onOpen: () => {
          setTimeout(() => {
            return router.push("/login")
          },1000)
        }
      });

    }
  },[])

  useEffect(() => {
    const res = !(getTitleVal.trim() != '' && getContentVal.trim() != '')
    setDisabled(res)
  }, [getTitleVal, getContentVal]);


  return (
    <main className={style.container}>
      <section className={style.container_content}>
        {
          isLoading && <div className={style.spinner}>
            <CircularProgress />
          </div>
        }

        <div className={style.header_box}>
          <h2 className={style.header}>Q&A 작성하기</h2>
          <sub className={style.sub_header}>여러분들의 고민 또는 이야기를 들려주세요</sub>
          <sub className={style.sub_header}><span className={style.essential}>＊</span> 필수 입력칸입니다</sub>
        </div>
        <div className={style.title_box}>
          <h3 className={style.title}><span className={style.essential}>＊</span>제목</h3>
          <Input type={'text'} typeStyle={'write'} placeholder={'제목을 입력해주세요'} onChange={(evt) => setTitleVal(evt.target.value)}/>
        </div>
        <div className={style.content_box}>
          <h3 className={style.content_title}><span className={style.essential}>＊</span>내용</h3>
          <TextArea placeholder={'내용을 입력해주세요'} onChange={(evt) => setContentVal(evt.target.value)}/>
        </div>
        <div className={style.drag_drop_image_box}>
          <h3 className={style.drag_drop_image_box_title}>파일</h3>
          <DragDropImage setSelectedFiles={setSelectedFiles}
                         selectedFiles={selectedFiles}
                         setPreviewUrls={setPreviewUrls}
                         previewUrls={previewUrls}/>
        </div>
        <Button typeStyle={getDisabled ? 'write_disabled':'write_non_disabled'}
                text={'작성하기'}
                type={'write'}
                disabled={getDisabled}
                onClick={() => {
                  handleWrite()
                }}
        />
      </section>
      <ToastContainer />
    </main>
  );
};