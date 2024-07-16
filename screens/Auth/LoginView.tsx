import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import AnimatedTextInput from '../../components/AnimatedTextInput';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'RegisterView'>;

export default function RegisterView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
              value={email}
              onChangeText={setEmail}
            />
            <AnimatedTextInput
              label="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={() => console.log('Register')}>
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