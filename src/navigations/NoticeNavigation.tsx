import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Notice from '../pages/Notice';
import NoticeList from '../pages/NoticeList';

export type NoticeStackParamList = {
  NoticeList: undefined;
  Notice: undefined;
};

export type NoticeStackNavigationProp =
  NativeStackNavigationProp<NoticeStackParamList>;

const Stack = createNativeStackNavigator<NoticeStackParamList>();

export default function NoticeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NoticeList"
        component={NoticeList}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '공지사항',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          // headerRight: () => (
          //   <FontAwesome5Icon name="bell" size={35} color="#346627" />
          // ),
        }}
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '공지사항',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          // headerRight: () => (
          //   <FontAwesome5Icon name="bell" size={35} color="#346627" />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
