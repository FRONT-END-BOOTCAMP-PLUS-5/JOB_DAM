'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../utils/supabase/client';
import { IChat } from '../types/mypage/chat';

interface UseRealtimeChatProps {
  roomName: string;
  username: string;
  userId: string;
  type: number;
}

const EVENT_MESSAGE_TYPE = 'message';

export function useRealtimeChat({ roomName, username, userId, type }: UseRealtimeChatProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<IChat[]>([]);
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState<IChat>({
    content: '',
    memberId: '',
    createdAt: '',
    type: 0,
  });

  useEffect(() => {
    const newChannel = supabase.channel(roomName);

    setMessages([]);

    newChannel
      .on('broadcast', { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setNewMessage(payload.payload as IChat);
        // setMessages((current) => [...current, payload.payload as Chat]);
      })
      .subscribe(async (status) => {
        console.log('useRealtimeChat', status);
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, username, supabase]);

  useEffect(() => {
    const newTime = new Date(newMessage?.createdAt).getTime();
    const prevTime = new Date(messages[messages.length - 1]?.createdAt).getTime();

    if (newTime - prevTime < 200) {
      console.log('오류 메시지');
    } else {
      setMessages((current) => [...current, newMessage as IChat]);
    }
  }, [newMessage]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return;

      const message: IChat = {
        memberId: userId,
        content,
        createdAt: new Date().toISOString(),
        type: type,
      };

      const newTime = new Date(message?.createdAt).getTime();
      const prevTime = new Date(messages[messages?.length - 1]?.createdAt).getTime();

      if (newTime - prevTime < 200) {
        console.log('오류 메시지');
      } else {
        setMessages((current) => [...current, message]);

        await channel.send({
          type: 'broadcast',
          event: EVENT_MESSAGE_TYPE,
          payload: message,
        });
      }
    },
    [channel, isConnected, messages, type, userId],
  );

  return { messages, sendMessage, isConnected };
}
