import { Mentor } from '../entities/Mentor';

export interface MentorRepository {
  insertMentor(): Promise<Mentor>;
  findAll(): Promise<Mentor[]>;
  findOne(member_id: string): Promise<Mentor>;
}
