import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Board from '../pages/Board';
import NewPost from '../pages/NewPost';
import PostDetail from '../pages/PostDetail';
import SearchPost from '../pages/SearchPost';

export type RootStackParamList = {
  Board: undefined;
  NewPost: undefined;
  PostDetail: {postID: number};
  SearchPost: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function BoardNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="SearchPost" component={SearchPost} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}
