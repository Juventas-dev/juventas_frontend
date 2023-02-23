// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Board from '../pages/Board';
// import NewPost from '../pages/NewPost';
// import PostDetail from '../pages/PostDetail';
// import SearchPost from '../pages/SearchPost';
// import Home from '../pages/Home';

// export type RootStackParamList = {
//   Board: undefined;
//   NewPost: undefined;
//   PostDetail: {postID: number};
//   SearchPost: {goBackToBoard: string};
//   Home: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function BoardNavigation() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Board" component={Board} />
//       <Stack.Screen name="SearchPost" component={SearchPost} />
//       <Stack.Screen name="NewPost" component={NewPost} />
//       <Stack.Screen name="PostDetail" component={PostDetail} />
//       <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//   );
// }

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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type BoardStackParamList = {
  Board: undefined;
  NewPost: undefined;
  PostDetail: {postID: number};
  SearchPost: {goBackToBoard: string};
};

export type BoardStackNavigationProp =
  NativeStackNavigationProp<BoardStackParamList>;

export type PostDetailRouteProp = RouteProp<BoardStackParamList, 'PostDetail'>;

const Stack = createNativeStackNavigator<BoardStackParamList>();

export default function BoardNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Board"
        component={Board}
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '게시판',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="SearchPost"
        component={SearchPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '글쓰기',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
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
    </Stack.Navigator>
  );
}
