import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Mypage from '../pages/Mypage';
import SetCategory from '../pages/SetCategory';
import MyGrade from '../pages/MyGrade';
import MyKnowhow from '../pages/MyKnowhow';
import MyCertification from '../pages/MyCertification';

export type MypageStackParamList = {
  Mypage: undefined;
  Profile: undefined;
  SetCategory: undefined;
  MyGrade: undefined;
  MyCertification: undefined;
  MyKnowhow: undefined;
};

export type MypageStackNavigationProp =
  NativeStackNavigationProp<MypageStackParamList>;

const Stack = createNativeStackNavigator<MypageStackParamList>();

export default function MypageNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '내 정보',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="SetCategory"
        component={SetCategory}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '카테고리',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="MyGrade"
        component={MyGrade}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '등급 보기',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="MyCertification"
        component={MyCertification}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '인증 보기',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="MyKnowhow"
        component={MyKnowhow}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '내 노하우',
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

/* <Stack.Screen
        name="Profile"
        component={{Profile}}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '퀘스트',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
      <Stack.Screen
        name="SetCategory"
        component={SetCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyGrade"
        component={MyGrade}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCertification"
        component={MyCertification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyKnowhow"
        component={MyKnowhow}
        options={{headerShown: false}}
      /> */
