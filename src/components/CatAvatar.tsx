import React from 'react';
import { View, Text } from 'react-native';
import { PetMood } from '../types';
import { PET_EXPRESSIONS } from '../utils/constants';

interface Props {
  mood: PetMood;
  size?: 'small' | 'medium' | 'large';
}

export function CatAvatar({ mood, size = 'medium' }: Props) {
  const expression = PET_EXPRESSIONS[mood.expression];
  
  const sizeStyles = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  const emojiSizes = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
  };

  const accessorySizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  return (
    <View className={`${sizeStyles[size]} relative items-center justify-center`}>
      {/* Main Cat Emoji */}
      <Text className={emojiSizes[size]}>{expression.emoji}</Text>
      
      {/* Accessories */}
      {mood.accessories.length > 0 && (
        <View className="absolute -top-1 -right-1 flex-row">
          {mood.accessories.map((accessory, index) => {
            let accessoryEmoji = '';
            switch (accessory) {
              case 'sunglasses':
                accessoryEmoji = '🕶️';
                break;
              case 'gold-chain':
                accessoryEmoji = '🔗';
                break;
              case 'begging-bowl':
                accessoryEmoji = '🥣';
                break;
              default:
                accessoryEmoji = accessory;
            }
            
            return (
              <Text
                key={index}
                className={`${accessorySizes[size]} ml-1`}
              >
                {accessoryEmoji}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
}