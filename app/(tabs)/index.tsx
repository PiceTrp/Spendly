import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useAppStore } from '../../src/store/useAppStore';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const { chatHistory, addChatMessage, userStats } = useAppStore();

  const sendMessage = () => {
    if (!message.trim()) return;

    addChatMessage({
      content: message.trim(),
      type: 'user',
    });

    // Simple response
    setTimeout(() => {
      addChatMessage({
        content: `Got it! I've recorded your message: "${message.trim()}"`,
        type: 'system',
      });
    }, 1000);

    setMessage('');
  };

  const renderChatItem = ({ item }: { item: any }) => (
    <View style={[
      styles.messageBubble,
      item.type === 'user' ? styles.userMessage : styles.systemMessage
    ]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat-to-Rich</Text>
        <Text style={styles.subtitle}>Balance: ${userStats.currentBalance}</Text>
      </View>

      {chatHistory.length === 0 ? (
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome! 🐱</Text>
          <Text style={styles.welcomeText}>
            Start by telling me about your expenses!
          </Text>
        </View>
      ) : (
        <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          style={styles.chatList}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Tell me about your expense..."
          style={styles.textInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  chatList: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#10b981',
    alignSelf: 'flex-end',
  },
  systemMessage: {
    backgroundColor: '#f3f4f6',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});