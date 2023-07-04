import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Setting from '../pages/Setting';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Quit from '../pages/Quit';
import ComplainNavigation from './ComplainNavigation';
import NoticeNavigation from './NoticeNavigation';
export type SettingStackParamList = {
  Setting: undefined;
  NoticeList: undefined;
  Complain: undefined;
  Quit: undefined;
};
export type SettingStackNavigationProp =
  NativeStackScreenProps<SettingStackParamList>;

const Stack = createNativeStackNavigator<SettingStackParamList>();

export default function SettingNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '설정',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="NoticeList"
        component={NoticeNavigation}
        options={{
          title: 'Notice',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Complain"
        component={ComplainNavigation}
        options={{
          title: 'Complain',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Quit"
        component={Quit}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '계정 관리',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
