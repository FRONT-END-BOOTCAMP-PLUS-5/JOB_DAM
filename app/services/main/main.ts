import { chatroomsNum } from '../count/chatroom';
import { membersNum } from '../count/member';
import { mentorsNum } from '../count/mentor';
import { questionsNum } from '../count/question';
import { MainDataResponse } from '@/app/types/main';

export const mainData = async (): Promise<MainDataResponse> => {
  const memberResponse = await membersNum();
  const questionResponse = await questionsNum();
  const mentorResponse = await mentorsNum();
  const mentorRoomResponse = await chatroomsNum();

  return {
    memberNum: memberResponse.data.result.length,
    questionNum: questionResponse.data.result.length,
    mentorNum: mentorResponse.data.result.length,
    mentorRoomNum: mentorRoomResponse.data.result.length,
  };
};
