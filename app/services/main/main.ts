import { chatroomsNum } from '../count/chatroom';
import { membersNum } from '../count/member';
import { mentorsNum } from '../count/mentor';
import { questionsNum } from '../count/question';

export const mainData = async () => {
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
