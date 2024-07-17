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
              width={22} height={18}
              style={styles.prideFlag}
            />
            <Text style={styles.genderName}>{gender.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
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
  titleContainer: {
    alignItems: "flex-start",
    marginTop: 60,
    marginBottom: 60,
    marginRight: 130,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genderBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedBubble: {
    backgroundColor: 'rgba(100, 100, 255, 0.5)',
  },
  prideFlag: {
    paddingLeft: 5,
    borderRadius: 5,
  },
  genderName: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: 'black',
  },
});