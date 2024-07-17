import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, Linking } from "react-native";
import { WithLocalSvg } from "react-native-svg/css";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const genderImages = {
  'male.svg': require('../assets/genders/male.svg'),
  'female.svg': require('../assets/genders/female.svg'),
  'agender.svg': require('../assets/genders/agender.svg'),
  'androgyne.svg': require('../assets/genders/androgyne.svg'),
  'bigender.svg': require('../assets/genders/bigender.svg'),
  'genderfluid.svg': require('../assets/genders/genderfluid.svg'),
  'genderqueer.svg': require('../assets/genders/genderqueer.svg'),
  'intersex.svg': require('../assets/genders/intersex.svg'),
  'neutrois.svg': require('../assets/genders/neutrois.svg'),
  'nonbinary.svg': require('../assets/genders/nonbinary.svg'),
  'pangender.svg': require('../assets/genders/pangender.svg'),
  'transgender.svg': require('../assets/genders/transgender.svg'),
  'trigender.svg': require('../assets/genders/trigender.svg'),
  'xenogender.svg': require('../assets/genders/xenogender.svg'),
};

const socialIcons = {
  Instagram: 'logo-instagram',
  Facebook: 'logo-facebook',
  Tiktok: 'logo-tiktok',
  Twitter: 'logo-twitter',
  AppleMusic: 'musical-notes',
};

interface FriendCardProps {
  name: string;
  genders: Array<{ pride: string; name: string }>;
  Locate?: string;
  socialMedia: Record<string, string>;
  profileImage: string;
  introduction: string;
}

const FriendCard: React.FC<FriendCardProps> = ({ name, genders, Locate, socialMedia, profileImage, introduction }) => {
  const handleSocialMediaPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };


  return (
    <View style={styles.card}>
      <ImageBackground
        // @ts-ignore
        source={profileImage}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.cardNameText}>{name}</Text>
            {Locate && <Text style={styles.locateText}>{Locate}에 거주중</Text>}
            <View style={styles.genderContainer}>
              {genders.map((gender, index) => (
                <View key={index} style={styles.genderBubble}>
                  <WithLocalSvg
                    // @ts-ignore
                    asset={genderImages[gender.pride]}
                    width={22} height={18}
                    style={styles.prideFlag}
                  />
                  <Text style={styles.genderName}>{gender.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.socialMediaContainer}>
              {Object.entries(socialMedia).map(([platform, url]) => (
                url ? (
                  <TouchableOpacity
                    key={platform}
                    onPress={() => handleSocialMediaPress(url)}
                  >
                    <Ionicons
                      // @ts-ignore
                      name={socialIcons[platform]}
                      size={35}
                      color="white"
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                ) : null
              ))}
            </View>
            <Text style={styles.introductionText}>{introduction}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

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
    alignItems: 'flex-start',
  },
  cardNameText: {
    fontSize: 40,
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    marginBottom: 8,
  },
  locateText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
    fontFamily: 'Pretendard-Medium',
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  genderBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8,
  },
  prideFlag: {
    paddingLeft: 5,
    borderRadius: 5,
  },
  genderName: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: 'white',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 3,
  },
  socialIcon: {
    marginRight: 20,
  },
  introductionText: {
    fontSize: 14,
    color: 'white',
    marginTop: 15,
    paddingBottom: 12,
    fontFamily: 'Pretendard-Light'
  },
});

export default FriendCard;