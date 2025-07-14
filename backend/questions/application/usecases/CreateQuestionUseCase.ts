import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import { Question } from '../../domain/entities/Question';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */
export class CreateQuestionUseCase {
  private repository: QuestionRepository;

  constructor(repository: QuestionRepository) {
    this.repository = repository;
  }

  async postStorage(formData: FormData):Promise<string[]>{
    const img:string[]= []

    for(let i=0; i<3; i++){
      const file = formData.get(`file${i+1}`) as File || ''

      if(file.name){
        //타임 스탬프
        const timestamp = Date.now();
        //확장자 가져오기
        const regex = /\.[a-zA-Z0-9]+$/
        //uuid 생성
        const uuid = crypto.randomUUID()
        const fileExtension = file.name.match(regex)

        const fileName = `${timestamp}_${uuid}${fileExtension}`
        img.push(fileName)
        await this.repository.insertStorage(fileName, file)
      }
    }

    return img
  }

  async create(formData: FormData): Promise<{ question: Question }> {
    const title = formData.get("title")
    const content = formData.get("content")
    const memberId = formData.get("memberId")

    const img = await this.postStorage(formData)

    const param = {
      title,
      content,
      memberId,
      img,
    }
    const question: Question = await this.repository.insertQuestion(param);


    return {
      question,
    };
  }
}
