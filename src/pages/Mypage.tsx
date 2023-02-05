import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {logout, unlink} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';

function Mypage() {
  const dispatch = useAppDispatch();
  const loginType = useSelector((state: RootState) => state.user.loginType);
  const signOutUser = async (): Promise<void> => {
    if (loginType === 'kakao') {
      const message = await logout();

      console.log(message);
    } else if (loginType === 'naver') {
      await NaverLogin.logout();
      console.log('네이버 로그아웃 완료');
    }
    dispatch(
      userSlice.actions.setUser({
        name: '',
        id: '',
        loginType: '',
      }),
    );
  };

  const unlinkUser = async (): Promise<void> => {
    if (loginType === 'kakao') {
      const message = await unlink();
      console.log(message);
    } else if (loginType === 'naver') {
      await NaverLogin.deleteToken();
      console.log('네이버 회원탈퇴 완료');
    }
    dispatch(
      userSlice.actions.setUser({
        name: '',
        id: '',
        loginType: '',
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
