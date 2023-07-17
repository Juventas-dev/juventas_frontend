import React, {useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import TodayChk from '../pages/TodayChk';
import PostDetail from '../pages/PostDetail';
import SearchPost from '../pages/SearchPost';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AllQuestNavigation from './AllQuestNavigation';

export type HomeStackParamList = {
  Home: {didCheck: String};
  TodayChk: undefined;
  FirstSetting: undefined;
  PostDetail: {postID: number};
  SearchPostHome: undefined;
  AllQuest: undefined;
};

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigation() {
  // const [myQuestAgain, setMyQuestAgain] = useState(0);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '홈',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          // headerRight: () => (
          //   <FontAwesome5Icon name="bell" size={35} color="#346627" />
          // ),
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
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
        name="TodayChk"
        component={TodayChk}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '도전',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
      <Stack.Screen
        name="SearchPostHome"
        component={SearchPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllQuest"
        component={AllQuestNavigation}
        options={{
          title: 'AllQuest',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
