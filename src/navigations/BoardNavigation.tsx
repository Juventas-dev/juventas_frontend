import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Board from '../pages/Board';

export type RootStackParamList = {
  Board: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function BoardNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
    </Stack.Navigator>
  );
}
