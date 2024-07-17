import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View, Platform } from "react-native";
import { WithLocalSvg } from "react-native-svg/css";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const genderImages = {
  'agender.svg': require('../assets/genders/agender.svg'),
  'bigender.svg': require('../assets/genders/bigender.svg'),
};

const socialIcons = {
  Instagram: 'logo-instagram',
  Facebook: 'logo-facebook',
  Tiktok: 'logo-tiktok',
  Twitter: 'logo-twitter',
  Spotify: 'logo-spotify',
  AppleMusic: 'musical-notes',
};

interface FriendCardProps {
  name: string;
  genderPride: string;
  genderName: string;
  Locate?: string;
  socialMedia: Record<string, string>;
  profileImage: string;
}

const FriendCard: React.FC<FriendCardProps> = ({ name, genderPride, genderName, Locate, socialMedia, profileImage }) => (
  <View style={styles.card}>
    {/*<ImageBackground source={{ uri: profileImage }} style={styles.backgroundImage}>*/}
    <ImageBackground source={require('../assets/people.jpeg')} style={styles.backgroundImage}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.cardNameText}>{name}</Text>
          <View style={styles.genderBubble}>
            <WithLocalSvg asset={genderImages[genderPride]} width={20} height={20} style={styles.prideFlag} />
            <Text style={styles.genderName}>{genderName}</Text>
          </View>
          <View style={styles.socialMediaContainer}>
            {Object.entries(socialMedia).map(([platform, url]) => (
              url ? (
                <Ionicons
                  key={platform}
                  name={socialIcons[platform]}
                  size={24}
                  color="white"
                  style={styles.socialIcon}
                />
              ) : null
            ))}
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.88,
    height: SCREEN_HEIGHT * 0.68,
    borderRadius: 40,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  cardNameText: {
    fontSize: 40,
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    marginBottom: 10,
  },
  genderBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
  },
  prideFlag: {
    paddingLeft: 3,
    borderRadius: 5,
  },
  genderName: {
    marginLeft: 5,
    fontSize: 14,
    color: 'white',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 5,
  },
});

export default FriendCard;