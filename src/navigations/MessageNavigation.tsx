import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Message from '../pages/Message';
import MessageDetail from '../pages/MessageDetail';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RouteProp} from '@react-navigation/native';

export type MessageStackParamList = {
  Message: undefined;
  MessageDetail: {incr: string};
};

export type MessageStackNavigationProp =
  NativeStackNavigationProp<MessageStackParamList>;

export type PostDetailRouteProp = RouteProp<
  MessageStackParamList,
  'MessageDetail'
>;

const Stack = createNativeStackNavigator<MessageStackParamList>();

function MessageNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={Message}
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '쪽지',
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{
          headerBackTitle: '뒤로',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#F9FAF8'},
          headerTitleAlign: 'center',
          headerTitle: '쪽지', // 여기에 상대방 이름을 뜨게 할 수 있나?
          headerTintColor: '#346627',
          headerTitleStyle: {fontSize: 22, fontWeight: '800'},
          headerRight: () => (
            <FontAwesome5Icon name="bell" size={35} color="#346627" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MessageNavigation;
