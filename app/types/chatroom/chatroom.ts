export interface ChatRoomRef {
  title: string;
  description: string;
  max_people: number;
  created_member_id: string;
  member_id: string;
}

export interface UpdateChatRoomRef {
  chat_room_id: number;
  progress: number;
}
