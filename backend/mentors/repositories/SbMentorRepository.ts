import { SupabaseClient } from '@supabase/supabase-js';
import { Mentor } from '../domain/entities/Mentor';
import { MentorRepository } from '../domain/repositories/MentorRepository';

interface ClientProp {
  company?: string;
  level?: string;
  work_period?: string;
}

const MENTOR_TABLE_NAME = 'mentor_application';

export class SbMentorRepository implements MentorRepository {
  private supabase;
  private clientData;

  constructor(supabase: SupabaseClient, clientData: ClientProp = {}) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async insertMentor(member_id: string): Promise<Mentor> {
    const { data, error } = await this.supabase
      .from(MENTOR_TABLE_NAME)
      .insert({ ...this.clientData, member_id: member_id })
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return data as Mentor;
  }

  async findAll(): Promise<Mentor[]> {
    const { data, error } = await this.supabase.from(MENTOR_TABLE_NAME).select('*');

    if (error) throw new Error(error.message);
    return data as Mentor[];
  }

  async findOne(member_id: string): Promise<Mentor[]> {
    const { data, error } = await this.supabase
      .from(MENTOR_TABLE_NAME)
      .select('member_id, company, level, work_period, created_at')
      .eq('member_id', member_id);

    if (error) throw new Error(error.message);

    return data as Mentor[];
  }
}
