import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios, {AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import FindID from './src/pages/FindID';
import Mypage from './src/pages/Mypage';
import {useAppDispatch} from './src/store';
import {RootState} from './src/store/reducer';
import {useSelector} from 'react-redux';
import userSlice from './src/slices/user';
import FindPassword from './src/pages/FindPassword';
import Config from 'react-native-config';
import BoardNavigation from './src/navigations/BoardNavigation';
import Message from './src/pages/Message';
import Setting from './src/pages/Setting';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import HomeNavigation from './src/navigations/HomeNavigation';
import {RouteProp, ParamListBase} from '@react-navigation/native';

export type LoggedInParamList = {
  Board: undefined;
  Message: undefined;
  Home: undefined;
  Mypage: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  FindID: undefined;
  FindPassword: undefined;
  Board: undefined;
  Knowhow: undefined;
  Quest: undefined;
};

const screenoptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
  return {
    tabBarStyle: {height: 80},
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: '#1F6733',
    tabBarInactiveTintColof: '#DAE2D8',
    tabBarLabelStyle: {fontSize: 11, paddingBottom: 10},
  };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.id);

  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const response = await axios.get(
          `${Config.API_URL}/user/refreshToken`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            id: response.data.id,
            name: response.data.name,
            accessToken: response.data.accessToken,
          }),
        );
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  return isLoggedIn ? (
    <Tab.Navigator initialRouteName="HomeNav" screenOptions={screenoptions}>
      <Tab.Screen
        name="BoardNav"
        component={BoardNavigation}
        options={{
          title: 'Board',
          headerShown: false,
          tabBarLabel: '게시판',
          tabBarIcon: ({color}) => (
            <FontAwesome5Icon name="bars" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          title: 'Message',
          headerShown: false,
          tabBarLabel: '쪽지',
          tabBarIcon: ({color}) => (
            <AntDesignIcon name="message1" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeNav"
        component={HomeNavigation}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: ({color}) => (
            <FontAwesome5Icon name="home" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          title: 'Mypage',
          headerShown: false,
          tabBarLabel: '내정보',
          tabBarIcon: ({color}) => (
            <IoniconsIcon name="person" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          title: 'Setting',
          headerShown: false,
          tabBarLabel: '설정',
          tabBarIcon: ({color, size}) => (
            <IoniconsIcon name="settings" color={color} size={size} />
          ),
        }}
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