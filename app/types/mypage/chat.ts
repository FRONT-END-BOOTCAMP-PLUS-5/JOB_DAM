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

export interface ChatRef {
  chat_room_id: number;
  member_id: string;
  content: string;
}

export interface Chat {
  id: number;
  content: string;
  chatRoomId: number;
  memberId: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
}
