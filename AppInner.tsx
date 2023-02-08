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
import Home from './src/pages/Home';
import Setting from './src/pages/Setting';

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
    <Tab.Navigator>
      <Tab.Screen
        name="BoardNav"
        component={BoardNavigation}
        options={{title: 'Board'}}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{title: 'Message'}}
      />
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{title: 'Mypage'}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{title: 'Setting'}}
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
