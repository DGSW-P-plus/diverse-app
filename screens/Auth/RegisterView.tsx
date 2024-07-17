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
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import AnimatedTextInput from '../../components/AnimatedTextInput';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'RegisterView'>;

export default function RegisterView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const registerBody = {
      username: id,
      password: password,
      nickname: name,
    };

    if (!name || !id || !password || !confirmPassword) {
      Alert.alert("오류", "모든 필드를 채워주세요.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log(registerBody)
      const response = await axios.post(`http://172.16.3.79:8080/auth/signup`, registerBody);

      console.log(response.data);
      if (response.data.data) {
        const { accessToken, refreshToken } = response.data.data;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        Alert.alert("성공", "회원가입이 완료되었습니다.");
        navigation.replace('GenderSelectView',{isFirstNavigate: true})
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert("오류", "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StatusBar style="dark"/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Diverse</Text>
            <Text style={styles.titleBold}>회원가입</Text>
          </View>

          <View style={styles.formContainer}>
            <AnimatedTextInput
              label="이름 | 닉네임"
              value={name}
              icon={<FontAwesome5 name="user-alt" size={24} color="#6c6c6c" />}
              onChangeText={setName}
            />
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
            <AnimatedTextInput
              label="비밀번호 확인"
              value={confirmPassword}
              icon={<FontAwesome name="check" size={24} color="#6c6c6c" />}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>회원가입</Text>
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
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#a3a3a3',
  },
  titleBold: {
    fontSize: 55,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#050505',
  },
  formContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
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
