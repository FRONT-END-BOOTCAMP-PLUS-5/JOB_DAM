import { ApplicationMentor } from '@/app/types/mypage/mentor';
import axios from 'axios';

export const mentorService = () => {
  const applicationMentor = async (mentorApplication: ApplicationMentor) => {
    const { company, level, workPeriod } = mentorApplication;

    const param = {
      company: company,
      level: level,
      work_period: workPeriod,
    };

    const { data, error } = await axios.post('/api/mentor', param).catch((error) => error);

    return {
      data: data,
      error: error && error.message,
    };
  };

  const getMentorApplication = async (memberId?: string) => {
    const { data, error } = await axios.get(`/api/mentor${memberId ? '?id=' + memberId : ''}`).catch((error) => error);

    return {
      data: data,
      error: error && error.message,
    };
  };

  return {
    applicationMentor,
    getMentorApplication,
  };
};
