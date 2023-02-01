import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import FindID from './src/pages/FindID';
import FindPassword from './src/pages/FindPassword';
import Quest from './src/pages/Quest';
import Board from './src/pages/Board';
import Diary from './src/pages/Diary';
import Mypage from './src/pages/Mypage';
// import {
//   SafeAreaView, ScrollView, KeyboardAvoidingView,
//   Text, Alert, TextInput, Pressable,
//   StyleSheet, View
// } from 'react-native';
// import {useCallback} from 'react';
import {useState} from 'react';

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

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Quest"
            component={Quest}
            options={{title: 'Quest'}}
          />
          <Tab.Screen
            name="Board"
            component={Board}
            options={{title: 'Board'}}
          />
          <Tab.Screen
            name="Diary"
            component={Diary}
            options={{title: 'Diary'}}
          />
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
      )}
    </NavigationContainer>
  );
}

// npm i @react-navigation/native
// npm i @react-navigation/native-stack
// npm i react-native-screens react-native-safe-area-context
// npx pod-install # 맥 전용
// npm i react-native-keyboard-aware-scroll-view --save
// npm install @react-navigation/bottom-tabs
// npm install react-native-simple-modal --save
// npm i react-native-vector-icons react-native-paper
// npm i --save-dev @types/react-native-vector-icons
