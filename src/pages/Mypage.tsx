import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {logout, unlink} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';

function Mypage() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const signOutUser = async (): Promise<void> => {
    if (user.loginType === 'kakao') {
      await logout();
      console.log('카카오 로그아웃 완료');
    } else if (user.loginType === 'naver') {
      await NaverLogin.logout();
      console.log('네이버 로그아웃 완료');
    } else {
      const response = await axios.get(`${Config.API_URL}/user/logout`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(response);
      await EncryptedStorage.removeItem('refreshToken');
    }
    dispatch(
      userSlice.actions.setUser({
        name: '',
        id: '',
        phoneNum: '',
        loginType: '',
        accessToken: '',
      }),
    );
  };

  const unlinkUser = async (): Promise<void> => {
    if (user.loginType === 'kakao') {
      await unlink();
      const response = await axios.delete(
        `${Config.API_URL}/user/unlinkSocial?id=${user.id}`,
      );
      console.log(response);
      console.log('카카오 회원탈퇴 완료');
    } else if (user.loginType === 'naver') {
      await NaverLogin.deleteToken();
      const response = await axios.delete(
        `${Config.API_URL}/user/unlinkSocial?id=${user.id}`,
      );
      console.log(response);
      console.log('네이버 회원탈퇴 완료');
    } else {
      const response = await axios.delete(
        `${Config.API_URL}/user/unlink?id=${user.id}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        },
      );
      console.log(response);
      await EncryptedStorage.removeItem('refreshToken');
    }
    dispatch(
      userSlice.actions.setUser({
        name: '',
        id: '',
        phoneNum: '',
        loginType: '',
        accessToken: '',
      }),
    );
  };

  return (
    <View>
      <Pressable onPress={signOutUser}>
        <Text>로그아웃</Text>
      </Pressable>
      <Pressable onPress={unlinkUser}>
        <Text>회원 탈퇴</Text>
      </Pressable>
    </View>
  );
}

export default Mypage;
