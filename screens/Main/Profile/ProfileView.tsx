import React, { useState, useEffect } from 'react';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../../navigation';
import { StatusBar } from "expo-status-bar";
import FriendCard from "../../../components/FriendCard";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Divider from "../../../components/Divider";
import axios from "axios";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ProfileView'>;

//TODO: 프로필 받아오기 구현
//TODO: 이미지 캐싱, SNS 컴포넌트 디자인
//TODO: 소개글 작성 페이지, Fetch 로직 만들기.
//TODO: Gender 수정 페이지, Fetch 로직 만들기.

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProfileView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [myProfile, setMyProfile] = useState({});
  const handleLogout = () => {
    Alert.alert(
      'Diverse 로그아웃',
      '정말로 로그아웃 하시겠습니까?',
      [
        {
          text: '예',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'StartView' }],
              })
            );
          },
          style: 'destructive',
        },
        {
          text: '아니요',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );

  }

  const fetchMyProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`http://172.16.1.250:8080/member/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      if (response.data.data) {
        setMyProfile(response.data.data);
        console.log(myProfile);
        setMyProfile(response.data.data);
      }
    } catch (e) {
      console.error('Fetching my profile error:', e);
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.cardContainer}>
        {/*{myProfile}*/}
        <FriendCard
          //@ts-ignore
          name={myProfile.username}
          //@ts-ignore
          genders={myProfile.genders}
          //@ts-ignore
          Locate={myProfile.location}
          socialMedia={{ Facebook: 'https://facebook.com/user2', Twitter: 'https://twitter.com/user2', Tiktok: 'https://tiktok.com/@user3', AppleMusic: 'https://open.spotify.com/user/user3' }}
          profileImage={require('../../../assets/tuser.jpeg')}
          //@ts-ignore
          introduction={myProfile.bio}
        />
      </View>
      <Divider orientation={'horizontal'} width={2} color={'#6e6e6e'} dividerStyle={styles.divider} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfileView', { isFirstNavigate: false })} >
          <Ionicons name="person-outline" size={23} color="black" />
          <Text style={styles.buttonText}>프로필 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GenderSelectView', { isFirstNavigate: false })} >
          <Ionicons name="transgender-outline" size={23} color="black"/>
          <Text style={styles.buttonText}>Gender 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConnectSNSView', { isFirstNavigate: false })}>
          <Ionicons name="share-social-outline" size={23} color="black" />
          <Text style={styles.buttonText}>SNS 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={23} color="white" />
          <Text style={[styles.buttonText, styles.logoutText]}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 60,
    marginBottom: 20,
  },
  buttonContainer: {
    width: SCREEN_WIDTH * 0.88,
  },
  cardTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: 'black',
    marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 15,
    padding: 15,
    marginBottom: 17,
  },
  divider: {
    marginBottom: 20,
  },
  buttonText: {
    marginLeft: 12,
    fontSize: 15,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold'
  },
  logoutButton: {
    backgroundColor: '#ff4757',
  },
  logoutText: {
    color: 'white',
  },
});