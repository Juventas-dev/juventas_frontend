import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Mypage from '../pages/Mypage';
import SetCategory from '../pages/SetCategory';
import MyGrade from '../pages/MyGrade';
import MyKnowhow from '../pages/MyKnowhow';
import MyCertificationNavigation from './MycertificationNavigation';
import MyPostDetail from '../pages/MyPostDetail';
import MessageDetail from '../pages/MessageDetail';
import {Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchMyPost from '../pages/SearchMypost';
import ModifyMyknowhow from '../pages/ModifyMyknowhow';

export type MypageStackParamList = {
  Mypage: undefined;
  Profile: undefined;
  SetCategory: undefined;
  MyGrade: undefined;
  MyCertification: undefined;
  MyKnowhow: undefined;
  MyPostDetail: {postID: number};
  MessageDetail: {incr: number};
  ModifyMyknowhow: undefined;
  SearchMyPost: undefined;
};

export type MypageStackNavigationProp =
  NativeStackNavigationProp<MypageStackParamList>;

export type MypageScreenProps = NativeStackScreenProps<
  MypageStackParamList,
  'Mypage'
>;

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
          headerStyle: {backgroundColor: '#E7EBE4'},
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
          headerStyle: {backgroundColor: '#E7EBE4'},
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
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '내 등급',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="MyCertification"
        component={MyCertificationNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchMyPost"
        component={SearchMyPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyKnowhow"
        component={MyKnowhow}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '내 글',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />

      <Stack.Screen
        name="MyPostDetail"
        component={MyPostDetail}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
      <Stack.Screen
        name="ModifyMyknowhow"
        component={ModifyMyknowhow}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
    </Stack.Navigator>
  );
}
