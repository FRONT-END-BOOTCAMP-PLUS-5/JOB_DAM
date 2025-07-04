import { SupabaseClient } from '@supabase/supabase-js';
import { Mentor } from '../domain/entities/Mentor';
import { MentorRepository } from '../domain/repositories/MentorRepository';

interface ClientProp {
  title?: string;
  content?: string;
  category_id?: number;
}

export class SbMentorRepository implements MentorRepository {
  private supabase;
  private clientData;

  constructor(supabase: SupabaseClient, clientData: ClientProp = {}) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async insertMentor(): Promise<Mentor> {
    const { data, error } = await this.supabase.from('mentor').insert([this.clientData]).select('*').single();

    if (error) throw new Error(error.message);
    return data as Mentor;
  }
}
