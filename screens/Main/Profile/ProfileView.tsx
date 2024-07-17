import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: 프로필 받아오기 구현
//TODO: 이미지 캐싱, SNS 컴포넌트 디자인
//TODO: 소개글 작성 페이지, Fetch 로직 만들기.
//TODO: Gender 수정 페이지, Fetch 로직 만들기.

export default function ProfileView() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    '음악', '댄스', '요리', '여행', '스포츠', '게임',
    '영화', '독서', '패션', '기술', '예술', '동물'
  ];

  // @ts-ignore
  const toggleInterest = (interest) => {
    // @ts-ignore
    setSelectedInterests(prevInterests =>
      // @ts-ignore
      prevInterests.includes(interest)
        ? prevInterests.filter(i => i !== interest)
        : [...prevInterests, interest]
    );
  };

  // @ts-ignore
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>관심사를 선택하세요</Text>
      <View style={styles.grid}>
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestButton,
              // @ts-ignore
              selectedInterests.includes(interest) && styles.selected
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  interestButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#ff4757',
  },
  interestText: {
    color: '#333',
    fontWeight: 'bold',
  },
});;