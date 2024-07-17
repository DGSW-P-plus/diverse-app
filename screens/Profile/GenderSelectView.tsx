import React, { useState, useEffect } from 'react';
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from '../../navigation';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithLocalSvg } from "react-native-svg/css";

type GenderSelectViewRouteProps = RouteProp<RootStackParamList, 'GenderSelectView'>;
type GenderSelectViewNavigationProps = StackNavigationProp<RootStackParamList, 'GenderSelectView'>;

const SCREEN_WIDTH = Dimensions.get('window').width;

const genderImages = {
  'male.svg': require('../../assets/genders/male.svg'),
  'female.svg': require('../../assets/genders/female.svg'),
  'agender.svg': require('../../assets/genders/agender.svg'),
  'androgyne.svg': require('../../assets/genders/androgyne.svg'),
  'bigender.svg': require('../../assets/genders/bigender.svg'),
  'genderfluid.svg': require('../../assets/genders/genderfluid.svg'),
  'genderqueer.svg': require('../../assets/genders/genderqueer.svg'),
  'intersex.svg': require('../../assets/genders/intersex.svg'),
  'neutrois.svg': require('../../assets/genders/neutrois.svg'),
  'nonbinary.svg': require('../../assets/genders/nonbinary.svg'),
  'pangender.svg': require('../../assets/genders/pangender.svg'),
  'transgender.svg': require('../../assets/genders/transgender.svg'),
  'trigender.svg': require('../../assets/genders/trigender.svg'),
  'xenogender.svg': require('../../assets/genders/xenogender.svg'),
};

export default function GenderSelectView() {
  const navigation = useNavigation<GenderSelectViewNavigationProps>();
  const route = useRoute<GenderSelectViewRouteProps>();
  const [selectedGenders, setSelectedGenders] = useState<number[]>([]);

  const genders = [
    { "name": "남성", "iconName": "male.svg", "id": 1 },
    { "name": "여성", "iconName": "female.svg", "id": 2 },
    { "name": "에이젠더", "iconName": "agender.svg", "id": 3 },
    { "name": "안드로진", "iconName": "androgyne.svg", "id": 4 },
    { "name": "바이젠더", "iconName": "bigender.svg", "id": 5 },
    { "name": "젠더플루이드", "iconName": "genderfluid.svg", "id": 6 },
    { "name": "젠더퀴어", "iconName": "genderqueer.svg", "id": 7 },
    { "name": "인터섹스", "iconName": "intersex.svg", "id": 8 },
    { "name": "뉴트로이스", "iconName": "neutrois.svg", "id": 9 },
    { "name": "논바이너리", "iconName": "nonbinary.svg", "id": 10 },
    { "name": "팬젠더", "iconName": "pangender.svg", "id": 11 },
    { "name": "트랜스젠더", "iconName": "transgender.svg", "id": 12 },
    { "name": "트라이젠더", "iconName": "trigender.svg", "id": 13 },
    { "name": "제노젠더", "iconName": "xenogender.svg", "id": 14 },
  ];

  useEffect(() => {
    if (!route.params.isFirstNavigate) {
      // API 호출 또는 AsyncStorage에서 데이터를 불러오는 로직
      // 예시:
      fetchGenderData();
    }
  }, []);

  const fetchGenderData = async () => {
    try {
      // API 호출 또는 AsyncStorage에서 데이터를 불러오는 로직
      // 예시:
      const response = await fetch('YOUR_API_ENDPOINT');
      const json = await response.json();
      if (json.status === 0 && json.data && json.data.genders) {
        //@ts-ignore
        const selectedIds = json.data.genders.map(gender => gender.id);
        setSelectedGenders(selectedIds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleGender = (id: number) => {
    setSelectedGenders(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(genderId => genderId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diverse</Text>
        <Text style={styles.titleBold}>젠더 선택</Text>
      </View>
      <View style={styles.genderContainer}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender.id}
            style={[
              styles.genderBubble,
              selectedGenders.includes(gender.id) && styles.selectedBubble
            ]}
            onPress={() => toggleGender(gender.id)}
          >
            <WithLocalSvg
              // @ts-ignore
              asset={genderImages[gender.iconName]}
              width={24} height={20}
              style={styles.prideFlag}
            />
            <Text style={[
              styles.genderName,
              selectedGenders.includes(gender.id) && styles.selectedGenderName
            ]}>
              {gender.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={() =>  navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'TabNavigator' }], }))}>
          {/*<TouchableOpacity style={styles.registerButton} onPress={handleLogin}>*/}
          <Text style={styles.registerButtonText}>저장하기</Text>
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
    marginTop: 80,
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 110,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
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
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 90,
  },
  genderBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // 수평 패딩 증가
    paddingVertical: 8,   // 수직 패딩 증가
    backgroundColor: 'rgba(255,255,255,0.93)',
    borderRadius: 22,      // 반경 증가
    marginRight: 10,       // 오른쪽 마진 증가
    marginBottom: 10,      // 아래쪽 마진 증가
    elevation: 5,
    borderWidth: 2,
    borderColor: '#e4e4e4',
  },
  selectedBubble: {
    borderColor: 'transparent',  // 선택 시 검은색 테두리
    backgroundColor: 'rgba(23,23,23,0.93)', // 배경색 유지
  },
  prideFlag: {
    paddingLeft: 5,
    borderRadius: 5,
    width: 26,  // 아이콘 크기 증가
    height: 22, // 아이콘 크기 증가
  },
  genderName: {
    marginLeft: 8,  // 왼쪽 마진 증가
    fontSize: 17,   // 글자 크기 증가
    fontFamily: 'Pretendard-Medium',
    color: 'black',
  },
  selectedGenderName: {
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },

});