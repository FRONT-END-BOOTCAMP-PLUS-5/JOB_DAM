export interface ChatRoom {
  id: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  title: string;
  chatMember: ChatMember[];
  createMember: {
    img: string;
    name: string;
    type: number;
    grade: number;
    nickname: string;
  };
  progress: number;
  maxPeople: number;
}

interface ChatMember {
  member: {
    name: string;
    nickname: string;
  };
  chatRoomId: number;
}

export interface ChatRef {
  chat_room_id: number;
  member_id: string;
  content: string;
  type: number;
}

export interface Chat {
  id?: number;
  content: string;
  chatRoomId?: number;
  memberId: string;
  createdAt: string;
  deletedAt?: string;
  updatedAt?: string;
  type: number;
}

export interface PayloadChat {
  chat_room_id: number;
  content: string;
  created_at: string;
  deleted_at?: string;
  id: number;
  member_id: string;
  updated_at?: string;
}
