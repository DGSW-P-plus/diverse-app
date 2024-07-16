import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: 채팅방 컴포넌트 구현
//TODO: 채팅 버블 구현
//TODO: STOMP 설치, 및 소캣 통신 구현

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