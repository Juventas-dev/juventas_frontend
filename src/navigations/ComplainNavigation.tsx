import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Complain from '../pages/Complain';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ComplainAnswer from '../pages/ComplainAnswer';
import NewComplain from '../pages/NewComplain';

export type ComplainStackParamList = {
  Complain: undefined;
  ComplainAnswer: undefined;
  NewComplain: undefined;
};

export type ComplainStackNavigationProp =
  NativeStackNavigationProp<ComplainStackParamList>;

const Stack = createNativeStackNavigator<ComplainStackParamList>();

export default function ComplainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Complain"
        component={Complain}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '문의 게시판',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          // headerRight: () => (
          //   <FontAwesome5Icon name="bell" size={35} color="#346627" />
          // ),
        }}
      />
      <Stack.Screen
        name="ComplainAnswer"
        component={ComplainAnswer}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '문의 게시판',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          // headerRight: () => (
          //   <FontAwesome5Icon name="bell" size={35} color="#346627" />
          // ),
        }}
      />
      <Stack.Screen
        name="NewComplain"
        component={NewComplain}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#E7EBE4'},
          headerTitleAlign: 'center',
          headerTitle: '문의 작성',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
        }}
      />
    </Stack.Navigator>
  );
}
