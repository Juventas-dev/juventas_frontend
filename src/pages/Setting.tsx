import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NaverLogin from '@react-native-seoul/naver-login';
import {RootState, useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {logout, unlink} from '@react-native-seoul/kakao-login';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Config from 'react-native-config';
import userSlice from '../slices/user';
import {SettingStackParamList} from '../navigations/SettingNavigation';

type SettingScreenProps = NativeStackScreenProps<
  SettingStackParamList,
  'Setting'
>;

function Setting({navigation}: SettingScreenProps) {
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
    <SafeAreaView style={styles.entire}>
      <View style={styles.Notice}>
        <Text>공지사항</Text>
        <View style={styles.NoticeBoard}>
          <Text>~~</Text>
        </View>
      </View>
      <Pressable style={styles.AllQuest}>
        <Text>전체 퀘스트 보기</Text>
      </Pressable>
      <View style={styles.AlarmSetting}>
        <Text>알림 설정</Text>
      </View>
      <View style={styles.ComplainBoard}>
        <Text>문의 게시판</Text>
      </View>
      <View style={styles.LogOut}>
        <Pressable style={styles.Logout} onPress={signOutUser}>
          <Text style={styles.Txt}>로그아웃</Text>
        </Pressable>
        <Pressable style={styles.ByeBye} onPress={unlinkUser}>
          <Text style={styles.Txt}>회원 탈퇴</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
export default Setting;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    flexWrap: 'nowrap',
    backgroundColor: '#F9FAF8',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 7,
  },
  Notice: {
    flex: 1,
    flexWrap: 'wrap',
  },
  NoticeBoard: {
    backgroundColor: 'white',
    width: '100%',
    height: 70,
  },
  AllQuest: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  AlarmSetting: {
    flex: 2,
  },
  ComplainBoard: {
    flex: 1,
  },
  LogOut: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Logout: {
    borderRadius: 10,
    backgroundColor: '#346627',
    width: 168,
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ByeBye: {
    borderRadius: 10,
    backgroundColor: '#B7CBB2',
    width: 168,
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Txt: {
    fontWeight: 'bold',
    color: 'white',
  },
});
