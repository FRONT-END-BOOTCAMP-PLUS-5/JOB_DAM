import { Mentor } from '../entities/Mentor';

export interface MentorRepository {
  insertMentor(): Promise<Mentor>;
}
