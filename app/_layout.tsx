import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAppStore } from '../src/store/useAppStore';
// Remove global.css import for now
// import '../global.css';

export default function RootLayout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}