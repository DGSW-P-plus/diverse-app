import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from "expo-font";

import { BackButton } from '../components/BackButton';
import Overview from '../screens/StartView';
import LoginView from "../screens/Auth/LoginView";
import { fontLists } from "../assets/fonts/fontLists";

export type RootStackParamList = {
  LoginView: undefined;
  StartView: undefined;
};

import { Text } from "react-native";
import StartView from "../screens/StartView";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [fontsLoaded] = useFonts(fontLists);
  if (!fontsLoaded) {
    return <Text> 정보 로딩중... </Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartView">
        <Stack.Screen name="StartView" component={StartView} options={{ headerShown: false }} />
        <Stack.Screen
          name="LoginView"
          component={LoginView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
