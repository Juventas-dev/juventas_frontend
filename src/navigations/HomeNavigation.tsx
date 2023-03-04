import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import TodayChk from '../pages/TodayChk';
import FirstSetting from '../pages/FirstSetting';
import PostDetail from '../pages/PostDetail';
import SearchPost from '../pages/SearchPost';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type HomeStackParamList = {
  Home: undefined;
  TodayChk: undefined;
  FirstSetting: undefined;
  PostDetail: {postID: number};
  SearchPost: {goBackToBoard: string};
};

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '홈',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="FirstSetting"
        component={FirstSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
      <Stack.Screen
        name="SearchPost"
        component={SearchPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TodayChk"
        component={TodayChk}
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
    </Stack.Navigator>
  );
}
