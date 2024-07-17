import React from "react";
import { Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
import { WithLocalSvg } from "react-native-svg/css";
import { Ionicons } from "@expo/vector-icons";


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
}

// @ts-ignore
const FriendCard: React.FC<FriendCardProps> = ({ name, genderPride, genderName, Locate, socialMedia }) => (
  <View style={styles.card}>
    <Image source={require('../assets/people.jpeg')} style={styles.profileImage} />

    <View style={styles.infoContainer}>
      <Text style={styles.cardNameText}>{name}</Text>

      <View style={styles.genderBubble}>
        <WithLocalSvg
          // @ts-ignore
          width={24}
          height={24}
          style={styles.prideFlag}
          // @ts-ignore
          asset={genderImages[genderPride]}
        />
        <Text style={styles.genderName}>{genderName}</Text>
      </View>

      {Locate && (
        <Text style={styles.location}>{Locate}에 거주중</Text>
      )}

      <View style={styles.socialMediaContainer}>
        {Object.entries(socialMedia).map(([platform, url]) => (
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

export default FriendCard