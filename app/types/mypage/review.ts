export interface Review {
  id: number;
  createdAt: string;
  deletedAt: string;
  content: string;
  rating: number;
  chatRoomId: number;
  chatRoom: ChatRoom;
}

interface ChatRoom {
  id: number;
  title: string;
  member: Member;
  createdAt: string;
  description: string;
}

interface Member {
  name: string;
  nickName: string;
}

export interface ReviewRef {
  member_id: string;
  content: string;
  rating: number;
}
