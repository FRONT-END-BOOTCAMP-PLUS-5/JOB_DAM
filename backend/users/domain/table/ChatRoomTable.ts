import { ChatMemberTable } from './ChatMemberTable';

export class ChatRoomTable {
  constructor(
    public id: string,
    public created_at: string,
    public updated_at: string,
    public deleted_at: string | null,
    public title: string,
    public chat_member: ChatMemberTable[],
    public member: {
      id: string;
      name: string;
      email: string;
    },
    public progress: number,
  ) {}
}
