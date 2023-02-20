import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import TodayChk from '../pages/TodayChk';

export type HomeStackParamList = {
  Home: undefined;
  TodayChk: undefined;
};

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function BoardNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TodayChk" component={TodayChk} />
    </Stack.Navigator>
  );
}
