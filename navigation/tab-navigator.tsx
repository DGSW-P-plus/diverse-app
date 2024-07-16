import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '.';
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import ChatListView from "../screens/Main/Chat/ChatListView";
import FriendCardView from "../screens/Main/Friend/FriendCardView";
import ProfileView from "../screens/Main/Profile/ProfileView";

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          height: 91,
        },
        tabBarActiveTintColor: '#050505',
      }}>
      <Tab.Screen
        name="ChatListView"
        component={ChatListView}
        options={{
          headerShown: false,
          title: '내 채팅',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Pretendard-SemiBold',
            marginTop: -4,
            paddingBottom: 3,
          },
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="FriendCardView"
        component={FriendCardView}
        options={{
          headerShown: false,
          title: '친구 찾기',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Pretendard-SemiBold',
            paddingBottom: 3,
          },
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-friends" size={23} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileView"
        component={ProfileView}
        options={{
          headerShown: false,
          title: '내 프로필',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Pretendard-SemiBold',
            paddingBottom: 3,
          },
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={23} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
