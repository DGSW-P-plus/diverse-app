import React, { useState } from 'react';
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
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
import { log } from "expo/build/devtools/logger";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AnimatedTextEditor from "../../components/AnimatedTextEditor";

type EditProfileViewRouteProps = RouteProp<RootStackParamList, 'EditProfileView'>;
type EditProfileViewNavigationProps = StackNavigationProp<RootStackParamList, 'EditProfileView'>;

export default function EditProfileView() {
  const navigation = useNavigation<EditProfileViewNavigationProps>();
  const route = useRoute<EditProfileViewRouteProps>();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');


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
            <Text style={styles.titleBold}>프로필 수정.</Text>
          </View>

          <View style={styles.formContainer}>
            <AnimatedTextInput
              label="이름 | 닉네임"
              value={name}
              icon={<FontAwesome5 name="user-alt" size={24} color="#6c6c6c" />}
              onChangeText={setName}
            />
            <AnimatedTextInput
              label="내 위치"
              value={location}
              icon={<Ionicons name="location-sharp" size={24} color="#6c6c6c" />}
              onChangeText={setLocation}
            />
            <AnimatedTextEditor
              label="자기소개"
              value={bio}
              icon={<Ionicons name="create-outline" size={24} color="#6c6c6c" />}
              onChangeText={setBio}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={() => console.log("Pressed")}>
            <Text style={styles.registerButtonText}>저장하기</Text>
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
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
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
