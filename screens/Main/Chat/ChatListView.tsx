import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: 채팅방 컴포넌트 구현
//TODO: 채팅 버블 컴포넌트 구현
//TODO: STOMP 설치, 및 소캣 통신 구현
//TODO: 비속어 & 조롱 막기
//TODO: 메인페이지 카드 API 연동, 맵핑 구현 / 마지막 인덱스가 되면 데이터 받아오도록.
//TODO: Gender  수정시에는 기존 젠더 값 받아오도록. & 통신구현
//TODO: Profile 수정 페이지 구현.
//TODO: SNS 연동 페이지 구현 & 재활용해서 수정시에는 기존 SNS 값 받아오도록.


export default function ChatListView() {
  return (
    <View style={styles.container}>
      <Text> 채팅 </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});