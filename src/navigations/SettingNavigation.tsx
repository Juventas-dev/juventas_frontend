import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Setting from '../pages/Setting';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
export type SettingStackParamList = {
  Setting: undefined;
  // NoticeTitle: undefined;
  // Complain: undefined;
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
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '설정',
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
/*<Stack.Screen
          name="NoticeTitle"
          component={NoticeTitle}
          options={{
            headerBackTitle: '뒤로',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#F9FAF8'},
            headerTitleAlign: 'center',
            headerTitle: '공지사항',
            headerTintColor: '#346627',
            headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          }}
        />
        <Stack.Screen
        name="Complain"
        component={Complain}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '문의 게시판',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      /> */