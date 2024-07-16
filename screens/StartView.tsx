import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../navigation';
import { StatusBar } from "expo-status-bar";

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'StartView'>;

export default function StartView() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentLine, setCurrentLine] = useState(1);

  const fullText1 = '차별의';
  const fullText2 = '벽을 허물다';
  const fullText3 = 'Diverse.';

  useEffect(() => {
    if (showAnimation == false) {
      textAnimation();
    }
  }, []);

  const textAnimation = () => {
    let index1 = 0, index2 = 0, index3 = 0;
    const typingInterval = setInterval(() => {
      if (index1 < fullText1.length) {
        setText1((prev) => prev + fullText1[index1]);
        index1++;
      } else if (index2 < fullText2.length) {
        if (index2 === 0) setCurrentLine(2);
        setText2((prev) => prev + fullText2[index2]);
        index2++;
      } else if (index3 < fullText3.length) {
        if (index3 === 0) setCurrentLine(3);
        setText3((prev) => prev + fullText3[index3]);
        index3++;
        setShowAnimation(true);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // 커서 깜빡임 효과
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }

  const cursor = showCursor ? '|' : '';

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.contentContainer}>
        <View style={styles.animationContainer}>
          <Text style={styles.def1}>
            {text1}{currentLine === 1 ? cursor : ''}
          </Text>
          <Text style={styles.def2}>
            {text2}{currentLine === 2 ? cursor : ''}
          </Text>
          <Text style={styles.def3}>
            {text3}{currentLine === 3 ? cursor : ''}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginView')}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterView')}>
          <Text style={styles.registerButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  animationContainer: {
    paddingBottom: 150,
  },
  def1: {
    fontSize: 65,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#a3a3a3',
  },
  def2: {
    fontSize: 63,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#838383',
  },
  def3: {
    fontSize: 82,
    fontFamily: 'Pretendard-ExtraBold',
    color: '#050505',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  loginButton: {
    width: '100%',
    height: 64,
    borderRadius: 45,
    marginBottom: 10,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    width: '100%',
    height: 64,
    borderRadius: 45,
    marginBottom: 10,
    borderColor: '#000000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#ffffff',
  },
  registerButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000000',
  }
});