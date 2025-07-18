'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../utils/supabase/client';
import { Chat } from '../types/mypage/chat';

interface UseRealtimeChatProps {
  roomName: string;
  username: string;
  userId: string;
  type: number;
}

const EVENT_MESSAGE_TYPE = 'message';

export function useRealtimeChat({ roomName, username, userId, type }: UseRealtimeChatProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newChannel = supabase.channel(roomName);

    console.log('create-channel', roomName);

    setMessages([]);

    newChannel
      .on('broadcast', { event: 'message', table: 'chat', schema: 'public' }, (payload) => {
        setMessages((current) => [...current, payload.payload as Chat]);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, username, supabase]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return;

      const message: Chat = {
        memberId: userId,
        content,
        createdAt: new Date().toISOString(),
        type: type,
      };

      // Update local state immediately for the sender
      setMessages((current) => [...current, message]);

      await channel.send({
        type: 'broadcast',
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      });
    },
    [channel, isConnected, type, userId],
  );

  return { messages, sendMessage, isConnected };
}
