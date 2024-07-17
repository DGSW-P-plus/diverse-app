import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";
import axios from 'axios';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: 채팅방 컴포넌트 구현
//TODO: 채팅 버블 컴포넌트 구현
//TODO: STOMP 설치, 및 소캣 통신 구현
//TODO: 비속어 & 조롱 막기
//TODO: 메인페이지 카드 API 연동, 맵핑 구현 / 마지막 인덱스가 되면 데이터 받아오도록.
//TODO: SNS 연동 페이지 구현 & 재활용해서 수정시에는 기존 SNS 값 받아오도록.

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
}

export default function ChatListView() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://your-api-url/chatrooms'); // Replace with your API endpoint
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const renderItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      style={styles.chatRoom}
      // onPress={() => navigation.navigate('ChatRoomView', { chatRoomId: item.id })}
    >
      <View style={styles.chatRoomInfo}>
        <Text style={styles.chatRoomName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
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
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#a3a3a3',
  },
  titleBold: {
    fontSize: 40,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#050505',
  },
  titleContainer: {
    alignItems: "flex-start",
    marginTop: 100,
    marginBottom: 40,
  },
  chatList: {
    paddingBottom: 16,
  },
  chatRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
});
