import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";
import axios from 'axios';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

interface Recipient {
  id: number;
  username: string;
  nickname: string;
}

interface ChatRoom {
  id: string;
  recipient: Recipient;
  lastMessage: string;
}

const exampleChatRooms: ChatRoom[] = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', recipient: { id: 1, username: 'user1', nickname: '김민지' }, lastMessage: "안녕하세요! 오늘 만나서 반가웠어요." },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', recipient: { id: 2, username: 'user2', nickname: '이승훈' }, lastMessage: "네, 알겠습니다. 다음에 봐요!" },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', recipient: { id: 3, username: 'user3', nickname: '최유진' }, lastMessage: "저도 그 영화 정말 재미있게 봤어요." },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', recipient: { id: 4, username: 'user4', nickname: '정다운' }, lastMessage: "내일 회의 시간이 어떻게 되나요?" },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', recipient: { id: 5, username: 'user5', nickname: '한소희' }, lastMessage: "축하드려요! 정말 기쁜 소식이네요." },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', recipient: { id: 6, username: 'user6', nickname: '송민호' }, lastMessage: "네, 주말에 봐요!" },
];

export default function ChatListView() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(exampleChatRooms);
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://your-api-url/chatrooms'); // Replace with your API endpoint
      if (response.data && response.data.data) {
        setChatRooms(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const renderItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      style={styles.chatRoom}
      onPress={() => navigation.navigate('ChatRoomView', { chatRoomId: item.id, nickname: item.recipient.nickname })}
    >
      <Image source={require('../../../assets/tuser.jpeg')} style={styles.profileImg} />
      <View style={styles.chatRoomInfo}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.chatRoomName}>{item.recipient.nickname}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diverse</Text>
        <Text style={styles.titleBold}>내 채팅방</Text>
      </View>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#a3a3a3',
  },
  titleBold: {
    fontSize: 45,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#050505',
  },
  titleContainer: {
    alignItems: "flex-start",
    marginTop: 80,
    marginBottom: 30,
  },
  chatList: {
    paddingBottom: 16,
  },
  chatRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  chatRoomInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatRoomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888888',
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
