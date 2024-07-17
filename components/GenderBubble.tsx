import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform, ViewStyle, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { WithLocalSvg } from 'react-native-svg';
import Agender from '../assets/genders'

type genderBubbleProps = {
  genderPride: string,
  genderName: string,
}

const genderImages = {
  'gay.svg': require('../assets/genders/gay.svg'),
  'bisexual.svg': require('../assets/genders/bisexual.svg'),
  'lesbian.svg': require('../assets/genders/lesbian.svg'),
};

export default function GenderBubble({genderPride, genderName}: genderBubbleProps) {

  return (
    <View style={styles.bcontainer}>
      <WithLocalSvg
        width={100}
        height={100}
        fill={"#000000"}
        asset={genderImages[genderPride]}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  bcontainer: {
    width: '30%',
    height: 35,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  prideFlag: {

  }
})