import { useState, useEffect } from 'react';
import { mainData } from '../services/main/main';
import { MainPageStats } from '../types/main';

export const useMainData = () => {
  const [stats, setStats] = useState<MainPageStats>({
    멤버수: 0,
    질문수: 0,
    멘토수: 0,
    멘토링방수: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await mainData();
        setStats({
          멤버수: data.memberNum,
          질문수: data.questionNum,
          멘토수: data.mentorNum,
          멘토링방수: data.mentorRoomNum,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
        console.error('Failed to fetch main data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, isLoading, error };
};
