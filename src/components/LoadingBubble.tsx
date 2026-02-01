import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

export function LoadingBubble() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      const animation = Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]);

      Animated.loop(animation).start();
    };

    animate();
  }, []);

  const dotStyle = (animatedValue: Animated.Value) => ({
    opacity: animatedValue,
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
    ],
  });

  return (
    <View className="items-start mb-3">
      <View className="bg-neutral-100 rounded-2xl rounded-bl-md px-4 py-3 flex-row items-center">
        <Text className="text-neutral-600 mr-2">🐱 Cat is writing</Text>
        <View className="flex-row space-x-1">
          <Animated.View style={dotStyle(dot1)}>
            <Text className="text-neutral-400">●</Text>
          </Animated.View>
          <Animated.View style={dotStyle(dot2)}>
            <Text className="text-neutral-400">●</Text>
          </Animated.View>
          <Animated.View style={dotStyle(dot3)}>
            <Text className="text-neutral-400">●</Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}