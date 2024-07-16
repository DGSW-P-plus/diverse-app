import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: react-native-deck-swiper 사용, 카드 컴포넌트 제작
//TODO: 카드에 데이터 맵핑
//TODO: Drag Refresh, 인덱스에 하나남으면 데이터 Re-Fetch해서 리스트에 넣기 구현

export default function FriendCardView() {
  return (
    <View style={styles.container}>
      <Text> 친구 </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});