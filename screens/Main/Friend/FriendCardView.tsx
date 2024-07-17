import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Platform } from "react-native";
import Swiper from 'react-native-deck-swiper';
import { StatusBar } from "expo-status-bar";
import { WithLocalSvg } from 'react-native-svg/css';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const genderImages = {
  'agender.svg': require('../../../assets/genders/agender.svg'),
  'bigender.svg': require('../../../assets/genders/bigender.svg'),
};

const socialIcons = {
  Instagram: 'logo-instagram',
  Facebook: 'logo-facebook',
  Tiktok: 'logo-tiktok',
  Twitter: 'logo-twitter',
  Spotify: 'logo-spotify',
  AppleMusic: 'musical-notes',
};

export default function FriendCardView() {
  const cards = [
    { id: 1, name: '박주영', genderPride: 'agender.svg', genderName: '에이젠더', Locate: '대구광역시', socialMedia: { Instagram: 'https://instagram.com/user1' } },
    { id: 2, name: '박준현', genderPride: 'bigender.svg', genderName: '바이젠더', Locate: '서울특별시', socialMedia: { Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2' } },
    { id: 3, name: '주강현', genderPride: 'agender.svg', genderName: '에이젠더', Locate: '창원통합시 성산구', socialMedia: { Tiktok: 'https://tiktok.com/@user3', Spotify: 'https://open.spotify.com/user/user3' } },
  ];
  // @ts-ignore
  const renderCard = (card: any) => (
    <View style={styles.card}>
      <Image source={require('../../../assets/people.jpeg')} style={styles.profileImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.cardNameText}>{card.name}</Text>

        <View style={styles.genderBubble}>
          <WithLocalSvg
            // @ts-ignore
            width={24}
            height={24}
            style={styles.prideFlag}
            // @ts-ignore
            asset={genderImages[card.genderPride]}
          />
          <Text style={styles.genderName}>{card.genderName}</Text>
        </View>

        {card.Locate && (
          <Text style={styles.location}>{card.Locate}</Text>
        )}

        <View style={styles.socialMediaContainer}>
          {Object.entries(card.socialMedia).map(([platform, url]) => (
            url ? (
              <View key={platform} style={styles.socialIcon}>
                <Ionicons name={socialIcons[platform] || 'ios-help'} size={24} color="black" />
              </View>
            ) : null
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <Swiper
        cards={cards}
        renderCard={renderCard}
        onSwiped={(cardIndex) => console.log(`카드 ${cardIndex}가 스와이프됨`)}
        onSwipedAll={() => console.log('모든 카드가 스와이프됨')}
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
});