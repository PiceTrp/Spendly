import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../utils/constants';

interface Props {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatBubble({ message, isUser, timestamp }: Props) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View className={`mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary-500 rounded-br-md'
            : 'bg-neutral-100 rounded-bl-md'
        }`}
      >
        <Text
          className={`text-base ${
            isUser ? 'text-white' : 'text-neutral-800'
          }`}
        >
          {message}
        </Text>
      </View>
      <Text className="text-xs text-neutral-400 mt-1 mx-1">
        {formatTime(timestamp)}
      </Text>
    </View>
  );
}