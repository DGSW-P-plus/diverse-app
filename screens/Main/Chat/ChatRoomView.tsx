import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy data for messages
const dummyMessages = [
  { id: 1, text: "Hello!", sender: "user" },
  { id: 2, text: "Hi there!", sender: "other" },
  { id: 3, text: "How are you?", sender: "user" },
  { id: 4, text: "I'm good, thanks!", sender: "other" },
];

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
}

export default function ChatRoomView() {
  const route = useRoute();
  const { nickname } = route.params as { nickname: string };
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.otherBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerText}>{nickname}</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.chatList}
          contentContainerStyle={{ paddingBottom: -20 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',

  },
  chatList: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#000000',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    marginRight: 10,
    maxHeight: 100, // Ensures the input does not grow indefinitely
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
});

