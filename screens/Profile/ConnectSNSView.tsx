import React, { useState, useEffect } from 'react';
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedTextInput from '../../components/AnimatedTextInput';
import axios from "axios";
import { log } from "expo/build/devtools/logger";

type ConnectSNSViewRouteProps = RouteProp<RootStackParamList, 'ConnectSNSView'>;
type ConnectSNSViewNavigationProps = StackNavigationProp<RootStackParamList, 'ConnectSNSView'>;

const socialIcons = {
  INSTAGRAM: 'logo-instagram',
  FACEBOOK: 'logo-facebook',
  TIKTOK: 'logo-tiktok',
  TWITTER: 'logo-twitter',
  APPLE_MUSIC: 'musical-notes',
};

export default function ConnectSNSView() {
  const navigation = useNavigation<ConnectSNSViewNavigationProps>();
  const route = useRoute<ConnectSNSViewRouteProps>();

  const [snsData, setSnsData] = useState({
    INSTAGRAM: '',
    FACEBOOK: '',
    TIKTOK: '',
    TWITTER: '',
    APPLE_MUSIC: '',
  });

  useEffect(() => {
    if (!route.params.isFirstNavigate) {
      fetchSNSData();
    }
  }, []);

  const fetchSNSData = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get('http://172.16.3.79:8080/sns/me',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { snsList } = response.data.data;
      const newSnsData = { ...snsData };
      snsList.forEach(sns => {
        newSnsData[sns.type] = sns.url;
      });
      setSnsData(newSnsData);
    } catch (error) {
      console.error('Fetching SNS data error:', error);
    }
  };

  const handleSave = async () => {
    console.log(snsData);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const snsArray = Object.entries(snsData).map(([type, url]) => ({ type, url }));
      console.log({ sns: snsArray })
      const response = await axios.patch('http://172.16.3.79:8080/sns/all', { sns: snsArray },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle successful save
      Alert.alert(
        'SNS 등록 완료',
        'SNS 등록이 완료되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'TabNavigator' }],
                })
              );
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Saving SNS data error:', error);
    }
  };

  const handleInputChange = (type, value) => {
    setSnsData(prevState => ({ ...prevState, [type]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diverse</Text>
        <Text style={styles.titleBold}>SNS 등록</Text>
      </View>

      <View style={styles.formContainer}>
        {Object.entries(socialIcons).map(([type, iconName]) => (
          <AnimatedTextInput
            key={type}
            label={type.charAt(0) + type.slice(1).toLowerCase().replace('_', ' ')}
            value={snsData[type]}
            onChangeText={(value) => handleInputChange(type, value)}
            icon={<Ionicons name={iconName} size={24} color="#6c6c6c" />}
          />
        ))}
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