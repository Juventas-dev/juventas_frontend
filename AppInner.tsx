import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import FindID from './src/pages/FindID';
import Quest from './src/pages/Quest';
import Board from './src/pages/Board';
import Diary from './src/pages/Diary';
import Mypage from './src/pages/Mypage';
import {RootState} from './src/store/reducer';
import {useSelector} from 'react-redux';
import FindPassword from './src/pages/FindPassword';
// import {
//   SafeAreaView, ScrollView, KeyboardAvoidingView,
//   Text, Alert, TextInput, Pressable,
//   StyleSheet, View
// } from 'react-native';
// import {useCallback} from 'react';
// import DismissKeyboardView from './src/components/DismissKeyBoardView'
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// import { create } from 'react-test-renderer';
export type LoggedInParamList = {
  Quest: undefined;
  Board: undefined;
  Diary: undefined;
  Mypage: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  FindID: undefined;
  FindPassword: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// const {width, height} = Dimensions.get('window') = 360 592

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.id);
  return isLoggedIn ? (
    <Tab.Navigator>
      <Tab.Screen name="Quest" component={Quest} options={{title: 'Quest'}} />
      <Tab.Screen name="Board" component={Board} options={{title: 'Board'}} />
      <Tab.Screen name="Diary" component={Diary} options={{title: 'Diary'}} />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{title: 'Mypage'}}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: 'SignIn', headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: 'SignUp'}}
      />
      <Stack.Screen
        name="FindID"
        component={FindID}
        options={{title: 'FindID'}}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{title: 'FindPassword'}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
