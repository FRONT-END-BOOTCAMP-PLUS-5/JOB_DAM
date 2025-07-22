export interface IChatRoom {
  id: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  title: string;
  chatMember: IChatMember[];
  createMember: {
    id: string;
    img: string;
    name: string;
    type: number;
    grade: number;
    nickname: string;
  };
  progress: number;
  maxPeople: number;
  review?: IReview[];
}

export interface IChatMember {
  member: {
    id: string;
    name: string;
    nickname: string;
    img?: string;
  };
  chatRoomId: number;
}

export interface IChatRef {
  chat_room_id: number;
  member_id: string;
  content: string;
  type: number;
}

export interface IChat {
  id?: number;
  content: string;
  chatRoomId?: number;
  memberId: string;
  createdAt: string;
  deletedAt?: string;
  updatedAt?: string;
  type: number;
}

export interface IPayloadChat {
  chat_room_id: number;
  content: string;
  created_at: string;
  deleted_at?: string;
  id: number;
  member_id: string;
  updated_at?: string;
}

interface IReview {
  id: number;
  rating: number;
  content: string;
  memberId: string;
  createdAt: string;
  deletedAt: string;
  chatRoomId: number;
}

export interface UpdateChatPointRef {
  member_id: string;
  point: number;
}
