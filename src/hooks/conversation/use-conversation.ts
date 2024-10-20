import { onGetChatMessages, onGetDomainChatRooms, onViewUnReadMessages } from '@/actions/conversation';
import { useChatContext } from '@/context/user-chat-context';
import { ConversationSearchSchema } from '@/schemas/conversation.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChatRoom, DomainChatRoomsResponse, Message } from '@/types/conversation';

export const useConversation = () => {
  const { register, watch } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode: 'onChange',
  });

  const { setLoading: setMessagesLoading, setChats, setChatRoom } = useChatContext();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeChatRoom, setActiveChatRoom] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  const fetchChatRooms = useCallback(async (domain: string) => {
    setLoading(true);
    try {
      const response = await onGetDomainChatRooms(domain);
      if (response && 'customer' in response) {
        const typedResponse = response as DomainChatRoomsResponse;
        setChatRooms(typedResponse.customer);
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.domain) {
        fetchChatRooms(value.domain);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, fetchChatRooms]);

  const onGetActiveChatMessages = useCallback(async (id: string) => {
    setMessagesLoading(true);
    try {
      const messages = await onGetChatMessages(id);
      if (messages && messages.length > 0 && messages[0].message) {
        setChatRoom(id);
        setChats(messages[0].message as Message[]);
      }
    } catch (error) {
      console.error('Error fetching active chat messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  }, [setMessagesLoading, setChatRoom, setChats]);

const onSeenChat = useCallback(async () => {
    if (activeChatRoom === roomId && urgent && roomId) {
      await onViewUnReadMessages(roomId);
    }
  }, [activeChatRoom, roomId, urgent]);

  return {
    register,
    chatRooms,
    loading,
    onGetActiveChatMessages,
    onSeenChat,
    setActiveChatRoom,
    setUrgent,
    setRoomId,
  };
};
