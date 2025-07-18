export interface Mentors {
  id: string;
  email: string;
  img: string | null;
  name: string;
  nickname: string;
  grade: number;
  point: number;
  type: number;
  mentorApplication: {
    company: string;
    level: string;
  };
}
