import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: 프로필 받아오기 구현
//TODO: 이미지 캐싱, SNS 컴포넌트 디자인
//TODO: 소개글 작성 페이지, Fetch 로직 만들기.
//TODO: Gender 수정 페이지, Fetch 로직 만들기.
export default function ProfileView() {
  return (
    <View style={styles.container}>
      <Text> 프로필 </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});