import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Board from '../pages/Board';
import NewPost from '../pages/NewPost';
import PostDetail from '../pages/PostDetail';
import SearchPost from '../pages/SearchPost';
import {RouteProp} from '@react-navigation/native';

export type BoardStackParamList = {
  Board: undefined;
  NewPost: undefined;
  PostDetail: {postID: number};
  SearchPost: undefined;
};

export type BoardStackNavigationProp =
  NativeStackNavigationProp<BoardStackParamList>;

export type PostDetailRouteProp = RouteProp<BoardStackParamList, 'PostDetail'>;

const Stack = createNativeStackNavigator<BoardStackParamList>();

export default function BoardNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen
        name="SearchPost"
        component={SearchPost}
        options={{headerShown: false}}
      />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
}
