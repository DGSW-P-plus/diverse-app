import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated
} from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import AnimatedTextInput from '../../components/AnimatedTextInput';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'RegisterView'>;


export default function RegisterView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="dark"/>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Diverse</Text>
          <Text style={styles.titleBold}>회원가입.</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <AnimatedTextInput
          label="이름 | 닉네임"
          value={email}
          onChangeText={setEmail}
        />
        <AnimatedTextInput
          label="사용자 ID"
          value={email}
          onChangeText={setEmail}
        />
        <AnimatedTextInput
          label="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AnimatedTextInput
          label="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={() => console.log('Register')}>
        <Text style={styles.registerButtonText}>회원가입</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 10,
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
    marginBottom: 80,
    paddingBottom: -40
  },
  registerButton: {
    width: '100%',
    height: 64,
    borderRadius: 45,
    marginBottom: 50,
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