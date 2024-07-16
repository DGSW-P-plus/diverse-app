import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";
import Swiper from 'react-native-deck-swiper';


type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ChatListView'>;

//TODO: react-native-deck-swiper 사용, 카드 컴포넌트 제작
//TODO: 카드에 데이터 맵핑
//TODO: Drag Refresh, 인덱스에 하나남으면 데이터 Re-Fetch해서 리스트에 넣기 구현
export default function FriendCardView() {
  const cards = [
    { id: 1, text: '첫 번째 카드' },
    { id: 2, text: '두 번째 카드' },
    { id: 3, text: '세 번째 카드' },
    // 더 많은 카드 데이터...
  ];

  // @ts-ignore
  const renderCard = (card) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={renderCard}
        onSwiped={(cardIndex) => console.log(`카드 ${cardIndex}가 스와이프됨`)}
        onSwipedAll={() => console.log('모든 카드가 스와이프됨')}
        cardIndex={0}
        backgroundColor={'#ececec'}
        stackSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    height: 400,
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  }
});
