import React, { useState } from 'react';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView, Alert
} from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import AnimatedTextInput from '../../components/AnimatedTextInput';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SERVER_URL } from "../../constants/ServerConstants";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'RegisterView'>;

export default function RegisterView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const loginBody = {
      username: id,
      password: password,
    };

    if (!id || !password) {
      Alert.alert("오류", "모든 필드를 채워주세요.");
      return;
    }

    try {
      console.log(loginBody)
      const response = await axios.post(`${SERVER_URL}/auth/login`, loginBody);

      console.log(response.data);
      if (response.data.data) {
        const { accessToken, refreshToken } = response.data.data;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          })
        );
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="dark"/>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Diverse</Text>
            <Text style={styles.titleBold}>로그인.</Text>
          </View>
          <View style={styles.formContainer}>
            <AnimatedTextInput
              label="사용자 ID"
              value={id}
              icon={<FontAwesome name="id-badge" size={24} color="#6c6c6c" />}
              onChangeText={setID}
            />
            <AnimatedTextInput
              label="비밀번호"
              value={password}
              icon={<Ionicons name="lock-closed" size={24} color="#6c6c6c" />}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          {/*<TouchableOpacity style={styles.registerButton} onPress={() =>  navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'TabNavigator' }], }))}>*/}
          <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
            <Text style={styles.registerButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    marginTop: 45,
    marginBottom: 60,
  },
  title: {
    fontSize: 38,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#a3a3a3',
  },
  titleBold: {
    fontSize: 64,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#050505',
  },
  formContainer: {
    marginTop: 0,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  registerButton: {
    width: '100%',
    height: 64,
    borderRadius: 45,
    backgroundColor: '#000000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Pretendard-SemiBold',
  },
});