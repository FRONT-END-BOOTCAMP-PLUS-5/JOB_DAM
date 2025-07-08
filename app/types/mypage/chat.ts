export interface ChatRoom {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  chatMember: ChatMember[];
  createMember: {
    id: string;
    name: string;
    email: string;
  };
}

interface ChatMember {
  chatRoomId: string;
  memberId: string;
}
