import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, TextInput, View } from "react-native";

type AnimatedTextInputProps = {
  label: string,
  value: string,
  onChangeText: (text: string) => void,
  secureTextEntry?: boolean
};

export default function AnimatedTextInput({ label, value, onChangeText, secureTextEntry }: AnimatedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    paddingTop: 3,
    left: 20,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 8]
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12]
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9e9e9e', '#6c6c6c']
    })
  };

  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={[styles.inputLabel, labelStyle]}>
        {label}
      </Animated.Text>
      <TextInput
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
  },
  inputLabel: {
    fontFamily: 'Pretendard-Bold',
  },
  input: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#000',
    paddingTop: 10,
  },
});
