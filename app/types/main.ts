export interface MainPageStats {
  멤버수: number;
  질문수: number;
  멘토수: number;
  멘토링방수: number;
}

export interface Category {
  logo: string;
  title: string;
  description: string;
}

export interface MainDataResponse {
  memberNum: number;
  questionNum: number;
  mentorNum: number;
  mentorRoomNum: number;
}
