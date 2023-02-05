import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  Alert,
  TextInput,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyBoardView';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import Config from 'react-native-config';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [ID, setID] = useState('');
  const [Pass, setPass] = useState('');
  const IDRef = useRef<TextInput | null>(null);
  const PassRef = useRef<TextInput | null>(null);

  const onChangeID = useCallback((text: string) => {
    setID(text.trim());
  }, []);
  const onChangePass = useCallback((text: string) => {
    setPass(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
    if (!ID || !ID.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    }
    if (!Pass || !Pass.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인되었습니다.');
  }, [ID, Pass]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const toFindID = useCallback(() => {
    navigation.navigate('FindID');
  }, [navigation]);

  const toFindPass = useCallback(() => {
    navigation.navigate('FindPassword');
  }, [navigation]);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      const profile: KakaoProfile = await getProfile();

      console.log(token);
      console.log(profile);
      dispatch(
        userSlice.actions.setUser({
          name: profile.nickname,
          id: 'kakao' + profile.id,
          loginType: 'kakao',
        }),
      );
      Alert.alert('알림', '로그인 되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    try {
      const response = await NaverLogin.login({
        appName: '유벤타스',
        consumerKey: `${Config.NAVER_LOGIN_CLIENT_ID}`,
        consumerSecret: `${Config.NAVER_LOGIN_CLIENT_SECRET}`,
      });
      const profile = await NaverLogin.getProfile(
        response.successResponse?.accessToken,
      );

      console.log(response);
      console.log(profile);
      dispatch(
        userSlice.actions.setUser({
          name: profile.response.name,
          id: 'naver' + profile.response.id,
          loginType: 'naver',
        }),
      );
      Alert.alert('알림', '로그인 되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  // const canGoNext = ID && Pass;
  return (
    <DismissKeyboardView>
      <View style={styles.entire}>
        <View style={styles.header}>
          <Text style={styles.headerText}>juventas</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.finding}>
            {/* 아이디찾기 비밀번호 찾기 */}
            <Pressable onPress={toFindID} style={styles.findIDBtn}>
              <Text style={styles.findText}>아이디 찾기</Text>
            </Pressable>
            <Pressable onPress={toFindPass} style={styles.findPASSBtn}>
              <Text style={styles.findText}>비밀번호 찾기</Text>
            </Pressable>
          </View>
          <View style={styles.typing}>
            {/* 아이디 비밀번호 입력 */}
            <Text style={styles.typingText}> 아이디</Text>
            <TextInput
              selectionColor={'#DE7878'}
              style={styles.typingInput}
              autoCapitalize="none"
              onChangeText={onChangeID}
              importantForAutofill="yes"
              autoComplete="username"
              textContentType="username"
              value={ID}
              clearButtonMode="while-editing"
              ref={IDRef}
              onSubmitEditing={() => PassRef.current?.focus()}
              blurOnSubmit={false}
            />
            <Text style={styles.typingText}>비밀번호</Text>
            <TextInput
              selectionColor={'#DE7878'}
              secureTextEntry={true}
              style={styles.typingInput}
              autoCapitalize="none"
              onChangeText={onChangePass}
              importantForAutofill="yes"
              autoComplete="password"
              textContentType="password"
              value={Pass}
              clearButtonMode="while-editing"
              ref={PassRef}
              onSubmitEditing={onSubmit}
            />
          </View>
          <View style={styles.btn}>
            <Pressable style={styles.signUpBtn} onPress={toSignUp}>
              <Text style={styles.btnText}>회원가입</Text>
            </Pressable>
            <Pressable style={styles.signInBtn} onPress={onSubmit}>
              <Text style={styles.btnText}>로그인</Text>
            </Pressable>
            <Pressable style={styles.signInBtn} onPress={signInWithKakao}>
              <Text style={styles.btnText}>카카오 로그인</Text>
            </Pressable>
            <Pressable style={styles.signInBtn} onPress={signInWithNaver}>
              <Text style={styles.btnText}>네이버 로그인</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#0E1D0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {height: 330, width: '100%'},
  headerText: {
    fontSize: 60,
    marginTop: 170,
    color: '#94EE3A',
    fontFamily: 'PurplePurse-Regular',
    textAlign: 'center',
  },
  body: {height: 240, width: 360, paddingHorizontal: 20, marginBottom: 5},
  finding: {height: 24, flexDirection: 'row', justifyContent: 'flex-end'},
  findIDBtn: {marginRight: 10},
  findPASSBtn: {marginRight: 3},
  findText: {
    color: '#EBE1E1CC',
    opacity: 0.8,
    fontSize: 10,
    fontFamily: 'NotoSansKR-Regular',
  },
  typing: {marginHorizontal: 5},
  typingText: {
    height: 25,
    color: '#FFE3E3',
    fontSize: 13,
    fontFamily: 'NotoSansKR-Regular',
  },
  typingInput: {
    height: 25,
    color: 'white',
    fontSize: 15,
    padding: 0,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 3,
    textAlignVertical: 'bottom',
    borderBottomColor: '#EBAAAA',
    borderBottomWidth: 2,
  },
  btn: {flexDirection: 'row', justifyContent: 'space-around', marginTop: 10},
  signUpBtn: {
    width: 135,
    height: 37,
    backgroundColor: '#E6CCCA',
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  signInBtn: {
    width: 135,
    height: 37,
    backgroundColor: '#94EE3A',
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  btnText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'NotoSansKR-Regular',
  },
});

export default SignIn;
