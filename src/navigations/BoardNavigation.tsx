import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Board from '../pages/Board';
import NewPost from '../pages/NewPost';
import PostDetail from '../pages/PostDetail';

export type RootStackParamList = {
  Board: undefined;
  NewPost: undefined;
  PostDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function BoardNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}
