import { Mentor } from '../entities/Mentor';

export interface MentorRepository {
  insertMentor(member_id: string): Promise<Mentor>;
  findAll(): Promise<Mentor[]>;
  findOne(member_id: string): Promise<Mentor[]>;
}
