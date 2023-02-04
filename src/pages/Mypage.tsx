import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {logout, unlink} from '@react-native-seoul/kakao-login';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

function Mypage() {
  const dispatch = useAppDispatch();
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    dispatch(
      userSlice.actions.setUser({
        name: '',
        id: '',
        loginType: '',
      }),
    );

    console.log(message);
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    dispatch(
      userSlice.actions.setUser({
        name: '',
        id: '',
        loginType: '',
      }),
    );

    console.log(message);
  };

  return (
    <View>
      <Pressable onPress={signOutWithKakao}>
        <Text>로그아웃</Text>
      </Pressable>
      <Pressable onPress={unlinkKakao}>
        <Text>회원 탈퇴</Text>
      </Pressable>
    </View>
  );
}

export default Mypage;
