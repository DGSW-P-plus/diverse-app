import { Link, useNavigation,CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import axios from 'axios';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'LoginView'>;

export default function LoginView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const requestData = {
    id: id,
    password: password,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="dark"/>
      <View style={styles.logotitle_container}>
        <View style={styles.title_container}>
          <Text style={styles.title}> 주야로 </Text>
          <Text style={styles.loginguide}> 로그인 </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.IDInput}
          value={id}
          onChangeText={setId}
          placeholder="이메일을 입력해주세요"
        />
        <TextInput
          style={styles.PWInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="비밀번호를 입력해주세요"
        />
        <TouchableOpacity style={styles.LoginButton} onPress={() => console.log('HomeView')}>
          <Text style={styles.loginbuttontext}> 로그인 </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logotitle_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    marginTop: 30,
  },
  imageStyle: {
    width: 75,
    height: 105,
    marginBottom: 25,
  },
  title_container: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 20, // Add
  },
  title: {
    fontSize: 42,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#000000',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  loginguide: {
    fontSize: 25,
    fontFamily: 'Pretendard-Light',
    paddingLeft: 5,
    color: '#000000',
  },
  loginbuttontext: {
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IDInput: {
    width: 343,
    height: 55,
    backgroundColor: '#F4F4F4',
    fontFamily: 'Pretendard-Bold',
    borderRadius: 15,
    marginBottom: 20,
    paddingLeft: 25,
  },
  PWInput: {
    width: 343,
    height: 55,
    backgroundColor: '#F4F4F4',
    fontFamily: 'Pretendard-Bold',
    borderRadius: 15,
    marginBottom: 20,
    paddingLeft: 25,
  },
  LoginButton: {
    width: 343,
    height: 55,
    backgroundColor: '#AA01FF',
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ResetPWContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ResetPWButton: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ResetPWGuidetext: {
    fontSize: 15,
    paddingTop: 1,
    color: '#6c6c6c',
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ResetPWtext: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#4b4b4b',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});