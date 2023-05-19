import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Modal, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NaverLogin from '@react-native-seoul/naver-login';
import {RootState, useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {logout, unlink} from '@react-native-seoul/kakao-login';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Config from 'react-native-config';
import userSlice from '../slices/user';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import {SettingStackParamList} from '../navigations/SettingNavigation';

type SettingScreenProps = NativeStackScreenProps<
  SettingStackParamList,
  'Setting'
>;

function Setting({navigation}: SettingScreenProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const AlltoggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    /*if (isEnabled) {
      setMessageIsEnabled(true);
      setBoardIsEnabled(true);
      setPointIsEnabled(true);
      setQuestIsEnabled(true);
    } */
  };
  const [MessageisEnabled, setMessageIsEnabled] = useState(false);
  const MessagetoggleSwitch = () => {
    /* if (isEnabled) {
      setIsEnabled(false);
    } */
    setMessageIsEnabled(previousState => !previousState);
  };
  const [BoardisEnabled, setBoardIsEnabled] = useState(false);
  const BoardtoggleSwitch = () => {
    /* if (isEnabled) {
      setIsEnabled(false);
    }
    */
    setBoardIsEnabled(previousState => !previousState);
  };
  const [PointisEnabled, setPointIsEnabled] = useState(false);
  const PointtoggleSwitch = () => {
    /* if (isEnabled) {
      setIsEnabled(false);
    }
    */
    setPointIsEnabled(previousState => !previousState);
  };
  const [QuestisEnabled, setQuestIsEnabled] = useState(false);
  const QuesttoggleSwitch = () => {
    /*if (isEnabled) {
      setIsEnabled(false);
    } */
    setQuestIsEnabled(previousState => !previousState);
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  const toNotice = useCallback(() => {
    navigation.navigate('Notice');
  }, [navigation]);
  const toComplain = useCallback(() => {
    navigation.navigate('Complain');
  }, [navigation]);

  const onLogOut = useCallback(() => {
    setShowLogoutModal(true);
  }, []);
  const onQuit = useCallback(() => {
    setShowQuitModal(true);
  }, []);

  const signOutUser = async (): Promise<void> => {
    if (user.loginType === 'kakao') {
      await logout();
      console.log('카카오 로그아웃 완료');
    } else if (user.loginType === 'naver') {
      await NaverLogin.logout();
      console.log('네이버 로그아웃 완료');
    } else {
      const response = await axios.patch(`${Config.API_URL}/user/logout`, {
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
        <Text style={styles.BoardTitle}>공지사항</Text>
        <View style={styles.NoticeBoard}>
          <Text style={styles.BoardTitleTxt}>공지 제목</Text>
          <Text>
            공지 메인에 들어가지 않아도 가장 최근의 공지사항 내용이 한눈에 바로
            들어올 수 있도록 합니다.
          </Text>
        </View>
      </View>
      <Pressable style={styles.All} onPress={toNotice}>
        <Text style={styles.AllTxt}>전체 공지 보기</Text>
      </Pressable>
      <View style={styles.AlarmSetting}>
        <Text style={styles.BoardTitle}>알림 설정</Text>
        <View style={styles.AlarmBoard}>
          <View style={styles.AlarmSt1}>
            <Text style={styles.BoardTitleTxt}>알림 전체</Text>
            <Switch
              trackColor={{false: '#767577', true: '#346627'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={AlltoggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.AlarmSt2}>
            <Text>쪽지 알림</Text>
            <Switch
              trackColor={{false: '#767577', true: '#346627'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={MessagetoggleSwitch}
              value={MessageisEnabled}
            />
          </View>
          <View style={styles.AlarmSt2}>
            <Text>게시판 알림</Text>
            <Switch
              trackColor={{false: '#767577', true: '#346627'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={BoardtoggleSwitch}
              value={BoardisEnabled}
            />
          </View>
          <View style={styles.AlarmSt2}>
            <Text>포인트 알림</Text>
            <Switch
              trackColor={{false: '#767577', true: '#346627'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={PointtoggleSwitch}
              value={PointisEnabled}
            />
          </View>
          <View style={styles.AlarmSt2}>
            <Text>퀘스트 알림</Text>
            <Switch
              trackColor={{false: '#767577', true: '#346627'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={QuesttoggleSwitch}
              value={QuestisEnabled}
            />
          </View>
        </View>
      </View>
      <View style={styles.ComplainBoard}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.BoardTitle}>문의 게시판</Text>
          <Text style={styles.TxtTip}>
            *1:1 문의는 카카오톡 채널을 이용 부탁드립니다
          </Text>
        </View>
        <View style={styles.NoticeBoard}>
          <View style={styles.FrequentQ}>
            <Text>자주 묻는 질문{')'}</Text>
            <Text>~~~~~</Text>
          </View>
          <View style={styles.FrequentQ}>
            <Text>자주 묻는 질문{')'}</Text>
            <Text>~~~~~</Text>
          </View>
          <View style={styles.FrequentQ}>
            <Text>자주 묻는 질문{')'}</Text>
            <Text>~~~~~</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.All} onPress={toComplain}>
        <Text style={styles.AllTxt}>전체 문의 보기</Text>
      </Pressable>
      <View style={styles.LogOut}>
        <Pressable style={styles.Logout} onPress={onLogOut}>
          <Text style={styles.Txt}>로그아웃</Text>
        </Pressable>
        <Pressable style={styles.ByeBye} onPress={onQuit}>
          <Text style={styles.Txt}>회원 탈퇴</Text>
        </Pressable>
      </View>
      <Modal transparent={true} visible={showLogoutModal}>
        <Pressable
          style={styles.modalBG}
          onPress={() => setShowLogoutModal(false)}>
          <View style={styles.modal}>
            <View style={styles.modalHead}>
              <CheckIcon
                name="check-circle"
                size={50}
                color="#F6DD55"
                style={styles.modalImg}
              />
              <Text style={styles.modalTextHeader}>
                정말 로그아웃 하시겟습니까?
              </Text>
            </View>
            <View style={styles.Choose}>
              <Pressable
                style={styles.NoBt}
                onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.ChooseTxt}>아니요</Text>
              </Pressable>
              <Pressable style={styles.YesBt} onPress={signOutUser}>
                <Text style={styles.ChooseTxt}>예</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal transparent={true} visible={showQuitModal}>
        <Pressable
          style={styles.modalBG}
          onPress={() => setShowQuitModal(false)}>
          <View style={styles.modal}>
            <View style={styles.modalHead}>
              <CheckIcon
                name="check-circle"
                size={50}
                color="#F6DD55"
                style={styles.modalImg}
              />
              <Text style={styles.modalTextHeader}>
                정말 탈퇴 하시겠습니까?
              </Text>
            </View>
            <View style={styles.Choose}>
              <Pressable
                style={styles.NoBt}
                onPress={() => setShowQuitModal(false)}>
                <Text style={styles.ChooseTxt}>아니요</Text>
              </Pressable>
              <Pressable style={styles.YesBt} onPress={unlinkUser}>
                <Text style={styles.ChooseTxt}>예</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
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
    paddingBottom: 4,
  },
  Notice: {
    flex: 1,
    flexWrap: 'wrap',
  },
  BoardTitle: {
    color: '#346627',
    fontWeight: 'bold',
    paddingLeft: 5,
    fontSize: 14,
  },
  TxtTip: {
    color: '#346627',
    fontSize: 10,
    marginLeft: 5,
    textAlignVertical: 'bottom',
  },
  NoticeBoard: {
    marginTop: 5,
    backgroundColor: 'white',
    width: '100%',
    height: 65,
    paddingHorizontal: 7,
    borderRadius: 7,
  },
  FrequentQ: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5,
  },
  All: {
    flex: 0.2,
    alignItems: 'flex-end',
    paddingRight: 5,
    paddingTop: 2,
  },
  AllTxt: {
    color: '#346627',
    fontSize: 10,
    fontWeight: '300',
  },
  AlarmSetting: {
    flex: 2,
  },
  AlarmBoard: {
    marginTop: 5,
    backgroundColor: 'white',
    width: '100%',
    height: 160,
    paddingHorizontal: 7,
    borderRadius: 7,
  },
  AlarmSt1: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BoardTitleTxt: {
    color: '#3D3C3C',
    fontWeight: 'bold',
    fontSize: 20,
  },
  AlarmSt2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ComplainBoard: {
    flex: 1,
    paddingTop: 15,
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
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 246,
    height: 181,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  modalHead: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImg: {
    marginTop: 3,
  },
  modalTextHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginVertical: 10,
  },
  Choose: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  NoBt: {
    width: '49.5%',
    backgroundColor: '#346627',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
  },
  YesBt: {
    width: '49.5%',
    backgroundColor: '#346627',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 30,
  },
  ChooseTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
