import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from "expo-font";

import StartView from "../screens/StartView";
import RegisterView from "../screens/Auth/RegisterView";
import LoginView from "../screens/Auth/LoginView";
import TabNavigator from  "navigation/tab-navigator"
import GenderSelectView from "../screens/Profile/GenderSelectView";
import ConnectSNSView from "../screens/Profile/ConnectSNSView";
import { fontLists } from "../assets/fonts/fontLists";


export type RootStackParamList = {
  LoginView: undefined;
  RegisterView: undefined;
  StartView: undefined;
  TabNavigator: undefined;
  ChatListView: undefined;
  FriendCardView: undefined;
  ProfileView: undefined;
  GenderSelectView: { isFirstNavigate: boolean };
  ConnectSNSView: { isFirstNavigate: boolean };
  EditProfileView: { isFirstNavigate: boolean };
  ChatRoomView: { chatRoomId: string, nickname: string };
};

import { Text } from "react-native";
import EditProfileView from "../screens/Profile/EditProfileView";
import ChatRoomView from "../screens/Main/Chat/ChatRoomView";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [fontsLoaded] = useFonts(fontLists);
  if (!fontsLoaded) {
    return <Text> 정보 로딩중... </Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartView">
        <Stack.Screen
          name="StartView"
          component={StartView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginView"
          component={LoginView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterView"
          component={RegisterView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenderSelectView"
          component={GenderSelectView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConnectSNSView"
          component={ConnectSNSView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileView"
          component={EditProfileView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="ChatRoomView"
        component={ChatRoomView}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
