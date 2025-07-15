import { ChatMember } from './ChatMember';

export class ChatRoom {
  constructor(
    public id: string,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string | null,
    public title: string,
    public chat_member: ChatMember[],
    public member: {
      id: string;
      img: string;
      name: string;
      type: number;
      grade: number;
      nickname: string;
    },
    public progress: number,
    public max_people: number,
  ) {}
}
