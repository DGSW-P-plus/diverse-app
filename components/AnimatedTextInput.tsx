import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TextInput, View } from "react-native";

type AnimatedTextInputProps = {
  label: string,
  value: string,
  onChangeText: (text: string) => void,
  secureTextEntry?: boolean,
  icon?: React.ReactNode
};

export default function AnimatedTextInput({ label, value, onChangeText, secureTextEntry, icon }: AnimatedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [focusAnim, isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(inputAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(inputAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [icon ? 50 : 20, icon ? 45 : 15]
    }),
    top: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 7]
    }),
    fontSize: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12]
    }),
    color: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9e9e9e', '#6c6c6c']
    })
  };

  const inputStyle = {
    paddingLeft: inputAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [icon ? 40 : 20, icon ? 30 : 0]
    })
  };

  return (
    <View style={styles.inputContainer}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Animated.Text style={[styles.inputLabel, labelStyle]}>
        {label}
      </Animated.Text>
      <Animated.View style={inputStyle}>
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
        />
      </Animated.View>
    </View>
  );
}

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
    height: '100%',
    textAlignVertical: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
});