export interface ChatRoom {
  id: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  title: string;
  chatMember: ChatMember[];
  createMember: {
    id: number;
    name: string;
    email: string;
  };
}

interface ChatMember {
  chatRoomId: number;
  memberId: string;
}
