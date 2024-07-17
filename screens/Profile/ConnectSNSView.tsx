import React, { useState, useEffect } from 'react';
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedTextInput from '../../components/AnimatedTextInput';
import axios from "axios";

type ConnectSNSViewRouteProps = RouteProp<RootStackParamList, 'ConnectSNSView'>;
type ConnectSNSViewNavigationProps = StackNavigationProp<RootStackParamList, 'ConnectSNSView'>;

const socialIcons = {
  Instagram: 'logo-instagram',
  Facebook: 'logo-facebook',
  Tiktok: 'logo-tiktok',
  Twitter: 'logo-twitter',
  AppleMusic: 'musical-notes',
};

export default function ConnectSNSView() {
  const navigation = useNavigation<ConnectSNSViewNavigationProps>();
  const route = useRoute<ConnectSNSViewRouteProps>();

  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [twitter, setTwitter] = useState('');
  const [appleMusic, setAppleMusic] = useState('');

  useEffect(() => {
    if (!route.params.isFirstNavigate) {
      fetchSNSData();
    }
  }, []);

  const fetchSNSData = async () => {
    try {

    } catch (error) {
      console.error('Fetching SNS data error:', error);
    }
  };

  const handleSave = async () => {

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diverse</Text>
        <Text style={styles.titleBold}>SNS 등록</Text>
      </View>

      <View style={styles.formContainer}>
        <AnimatedTextInput
          label="Instagram"
          value={instagram}
          onChangeText={setInstagram}
          // @ts-ignore
          icon={<Ionicons name={socialIcons.Instagram} size={24} color="#6c6c6c" />}
        />
        <AnimatedTextInput
          label="Facebook"
          value={facebook}
          onChangeText={setFacebook}
          // @ts-ignore
          icon={<Ionicons name={socialIcons.Facebook} size={24} color="#6c6c6c" />}
        />
        <AnimatedTextInput
          label="TikTok"
          value={tiktok}
          onChangeText={setTiktok}
          // @ts-ignore
          icon={<Ionicons name={socialIcons.Tiktok} size={24} color="#6c6c6c" />}
        />
        <AnimatedTextInput
          label="Twitter"
          value={twitter}
          onChangeText={setTwitter}
          // @ts-ignore
          icon={<Ionicons name={socialIcons.Twitter} size={24} color="#6c6c6c" />}
        />
        <AnimatedTextInput
          label="Apple Music"
          value={appleMusic}
          onChangeText={setAppleMusic}
          // @ts-ignore
          icon={<Ionicons name={socialIcons.AppleMusic} size={24} color="#6c6c6c" />}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#a3a3a3',
  },
  titleBold: {
    fontSize: 55,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#050505',
  },
  titleContainer: {
    alignItems: "flex-start",
    marginTop: 100,
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  saveButton: {
    width: '100%',
    height: 64,
    borderRadius: 45,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Pretendard-SemiBold',
  },
});