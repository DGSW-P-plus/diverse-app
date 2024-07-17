import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Platform, Animated, Button } from "react-native";
import Swiper from 'react-native-deck-swiper';
import { StatusBar } from "expo-status-bar";
import { WithLocalSvg } from 'react-native-svg/css';
import { Ionicons } from '@expo/vector-icons';
import FriendCard from "../../../components/FriendCard";
import axios from "axios";
import { SERVER_URL } from "../../../constants/ServerConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function FriendCardView() {
  const cards = [
    {
      id: 1,
      name: '소수자',
      genders: [{ iconName: 'agender.svg', name: '에이젠더' }],
      Locate: '대구광역시',
      socialMedia: { Instagram: 'https://instagram.com/user1', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "안녕하세요! 에이젠더로 살아가는 소수자입니다. 음악과 춤을 좋아하고, 새로운 사람들과의 만남을 즐깁니다."
    },
    {
      id: 2,
      name: '자근감',
      genders: [{ iconName: 'bigender.svg', name: '바이젠더' }, { iconName: 'xenogender.svg', name: '제노젠더' }],
      Locate: '서울특별시',
      socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "다양한 성 정체성을 가진 자근감입니다. 예술과 기술의 융합에 관심이 많고, 항상 새로운 도전을 즐깁니다."
    },
    {
      id: 3,
      name: '나강함',
      genders: [{ iconName: 'female.svg', name: '여성' }, { iconName: 'agender.svg', name: '에이젠더' }],
      Locate: '창원통합시 성산구',
      socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "여성이자 에이젠더인 나강함입니다. 환경 보호에 관심이 많고, 지속 가능한 생활 방식을 실천하고 있어요."
    },
    {
      id: 4,
      name: '박주영',
      genders: [{ iconName: 'agender.svg', name: '에이젠더' }],
      Locate: '대구광역시',
      socialMedia: { Instagram: 'https://instagram.com/user1', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "안녕하세요! 에이젠더로 살아가는 박주영입니다. 음악과 춤을 좋아하고, 새로운 사람들과의 만남을 즐깁니다."
    },
    {
      id: 5,
      name: '박준현',
      genders: [{ iconName: 'bigender.svg', name: '바이젠더' }, { iconName: 'xenogender.svg', name: '제노젠더' }],
      Locate: '서울특별시',
      socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "다양한 성 정체성을 가진 박준현입니다. 예술과 기술의 융합에 관심이 많고, 항상 새로운 도전을 즐깁니다."
    },
    {
      id: 6,
      name: '주강현',
      genders: [{ iconName: 'female.svg', name: '여성' }, { iconName: 'agender.svg', name: '에이젠더' }],
      Locate: '창원통합시 성산구',
      socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'hhttps://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "여성이자 에이젠더인 주강현입니다. 환경 보호에 관심이 많고, 지속 가능한 생활 방식을 실천하고 있어요."
    },
    {
      id: 7,
      name: '박주영',
      genders: [{ iconName: 'agender.svg', name: '에이젠더' }],
      Locate: '대구광역시',
      socialMedia: { Instagram: 'https://instagram.com/user1', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "안녕하세요! 에이젠더로 살아가는 박주영입니다. 음악과 춤을 좋아하고, 새로운 사람들과의 만남을 즐깁니다."
    },
    {
      id: 8,
      name: '박준현',
      genders: [{ iconName: 'bigender.svg', name: '바이젠더' }, { iconName: 'xenogender.svg', name: '제노젠더' }],
      Locate: '서울특별시',
      socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "다양한 성 정체성을 가진 박준현입니다. 예술과 기술의 융합에 관심이 많고, 항상 새로운 도전을 즐깁니다."
    },
    {
      id: 9,
      name: '주강현',
      genders: [{ iconName: 'female.svg', name: '여성' }, { iconName: 'agender.svg', name: '에이젠더' }],
      Locate: '창원통합시 성산구',
      socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://music.apple.com/profile/4rNe5' },
      profileImage: require('../../../assets/tuser.jpeg'),
      introduction: "여성이자 에이젠더인 주강현입니다. 환경 보호에 관심이 많고, 지속 가능한 생활 방식을 실천하고 있어요."
    },
  ];
  // const [cards, setCards] = useState<any[]>([])
  //
  // useEffect(() => {
  //   AsyncStorage.getItem("accessToken").then((token) =>{
  //     axios.get(`${SERVER_URL}/member/find`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //       params: {
  //         page: 0,
  //         size: 1000,
  //       }
  //     })
  //       .then((res) => {
  //         setCards(res.data.data)
  //       })
  //       .catch(err => console.error(err));
  //     },
  //   )
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Swiper
        cards={cards}
        // @ts-ignore
        renderCard={(card) => <FriendCard {...card} />}
        onSwiped={(cardIndex) => console.log(`카드 ${cardIndex}가 스와이프됨`)}
        onSwipedAll={() => console.log('모든 카드가 스와이프됨')}
        onSwipedLeft={(cardIndex) => {
          console.log(`카드 ${cardIndex}가 왼쪽으로 스와이프됨`);
          // 여기에 왼쪽 스와이프 시 실행할 로직을 추가합니다.
        }}
        cardIndex={0}
        backgroundColor={'#f1f1f1'}
        stackSize={3}
        cardStyle={styles.cardStyle}
        containerStyle={styles.swiperContainer}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
  },
  card: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  cardStyle: {
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },
  infoContainer: {
    alignItems: 'center',
  },
  cardNameText: {
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 10,
  },
  genderBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  prideFlag: {
    paddingLeft: 3,
  },
  genderName: {
    marginLeft: 5,
    fontSize: 14,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginHorizontal: 5,
  },
  chatPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  chatPreviewText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});