import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SERVER_URL, WEBSOCKET_URL } from "../../../constants/ServerConstants";
import { CompatClient, Stomp } from "@stomp/stompjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Message {
  roomId: string;
  userId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ChatRoomView() {
  const route = useRoute();
  const { nickname, chatRoomId: roomId } = route.params as { nickname: string, chatRoomId: string };
  const [me, setMe] = useState<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((token) => {
      axios.get(`${SERVER_URL}/member/me`, {
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        setMe(res.data.data)
      })
    })
  }, []);

  const stompClient = useRef<CompatClient | null>(null);

  useEffect(() => {
    connect();
    getMessages();

    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    const token = await AsyncStorage.getItem("accessToken")

    const websocket = new WebSocket(WEBSOCKET_URL)
    stompClient.current = Stomp.over(() => websocket);
    stompClient.current.connect(
      { Authorization: token },
      () => {
        stompClient.current!.subscribe(
          `/exchange/chat.exchange/room.${roomId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);

            setMessages((prevMessage) => [...prevMessage, newMessage]);
          })
      },
      (error: Error) => {
        console.error(error);

        stompClient.current = null;
      }
    );
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect(() => {
        console.log(`Disconnected from room ${roomId}`)
      });
    }
  }

  const getMessages = async () => {
    const token = await AsyncStorage.getItem("accessToken")

    try {
      const { data } = await axios.get(`${SERVER_URL}/chat/messages`, {
        params: { roomId },
        headers: {
          Authorization: token,
        },
      });

      console.log(data.data)

      setMessages(data.data);
    } catch (e) {
      console.error(e);
    }
  }
  
  const sendMessage = async () => {
    if (stompClient.current && message.trim().length !== 0) {
      const token = await AsyncStorage.getItem("accessToken")
      stompClient.current.send(
        "/pub/chat.sendMessage",
        {
          Authorization: token
        },
        JSON.stringify({
          roomId,
          message
        })
      )

      setMessage("");
    }
  }

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.userId === me.id;

    return <View style={[styles.messageBubble, isMe ? styles.userBubble : styles.otherBubble]}>
      <Text style={isMe ? styles.messageText : styles.otherMessageText}>{item.message}</Text>
    </View>
  };

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
          // keyExtractor={(item) => item.id}
          style={styles.chatList}
          contentContainerStyle={{ paddingBottom: -20 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
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
    backgroundColor: '#ececec',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
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
    marginBottom: 5,
  },
  userBubble: {
    backgroundColor: '#000000',
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  otherMessageText: {
    fontSize: 16,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    // marginBottom: -90,
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
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 10,
  },
});

