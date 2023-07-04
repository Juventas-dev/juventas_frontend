import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import AllQuest from '../pages/AllQuest';
import QuestList from '../pages/QuestList';

export type QuestStackParamList = {
  AllQuest: undefined;
  QuestList: undefined;
};

export type QuestStackNavigationProp =
  NativeStackNavigationProp<QuestStackParamList>;

const Stack = createNativeStackNavigator<QuestStackParamList>();

export default function AllQuestNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllQuest"
        component={AllQuest}
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
        name="QuestList"
        component={QuestList}
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
    </Stack.Navigator>
  );
}
