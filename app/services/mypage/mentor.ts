import { ApplicationMentor, ApplicationMentorList } from '@/app/types/mypage/mentor';
import axios from 'axios';

export const mentorService = {
  applicationMentor: async (mentorApplication: ApplicationMentor) => {
    const { id, company, level, workPeriod } = mentorApplication;

    const param = {
      member_id: id,
      company: company,
      level: level,
      work_period: workPeriod,
    };

    const { data, error } = await axios.post('/api/mentor', param).catch((error) => error);

    return {
      data: data,
      error: error && error.message,
    };
  },

  getMentorApplication: async (memberId?: string): Promise<{ mentor: ApplicationMentorList[] }> => {
    const { data, error } = await axios.get(`/api/mentor${memberId ? '?id=' + memberId : ''}`).catch((error) => error);

    console.log('data', data.result);

    if (error) throw new Error(error.message);

    return data.result;
  },

  getMentorList: async () => {
    const { data, error } = await axios.get('/api/mentor/search').catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      data,
    };
  },
};
