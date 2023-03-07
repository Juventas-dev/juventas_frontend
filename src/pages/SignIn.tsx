import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  Alert,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import axios, {AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import Config from 'react-native-config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  const onSubmit = useCallback(async () => {
    if (!ID || !ID.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    }
    if (!Pass || !Pass.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      console.log('1');
      console.log(`${Config.API_URL}/user/login`);
      const response = await axios.post(`${Config.API_URL}/user/login`, {
        id: ID,
        pwd: Pass,
      });
      console.log(response);
      dispatch(
        userSlice.actions.setUser({
          name: response.data.name,
          id: ID,
          loginType: 'custom',
          accessToken: response.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.refreshToken,
      );
      return Alert.alert('알림', '로그인되었습니다.');
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  }, [dispatch, ID, Pass]);

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
      const response = await axios.post(`${Config.API_URL}/user/signup`, {
        name: profile.nickname,
        id: 'kakao' + profile.id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithNaver = async (): Promise<void> => {
    try {
      const {successResponse} = await NaverLogin.login({
        appName: '유벤타스',
        consumerKey: `${Config.NAVER_LOGIN_CLIENT_ID}`,
        consumerSecret: `${Config.NAVER_LOGIN_CLIENT_SECRET}`,
      });
      if (successResponse) {
        const profile = await NaverLogin.getProfile(
          successResponse.accessToken,
        );
        console.log(successResponse);
        console.log(profile);
        dispatch(
          userSlice.actions.setUser({
            name: profile.response.name,
            id: 'naver' + profile.response.id,
            loginType: 'naver',
          }),
        );
        Alert.alert('알림', '로그인 되었습니다.');
        const response = await axios.post(`${Config.API_URL}/user/signup`, {
          name: profile.response.name,
          id: 'naver' + profile.response.id,
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const canGoNext = ID && Pass;
  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.entire}>
        <Text style={styles.logo}>juventas</Text>
        <View style={styles.finding}>
          {/* 아이디찾기 비밀번호 찾기 */}
          <Pressable onPress={toFindID} style={styles.findBtn}>
            <Text style={styles.findText}>아이디 찾기</Text>
          </Pressable>
          <Pressable onPress={toFindPass} style={styles.findBtn}>
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </Pressable>
        </View>
        {/* 아이디 비밀번호 입력 */}
        <Text style={styles.typingText}>아이디</Text>
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
          returnKeyType="next"
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
          returnKeyType="done"
          ref={PassRef}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.btn}>
          <Pressable style={styles.signUpBtn} onPress={toSignUp}>
            <Text style={styles.btnText}>회원가입</Text>
          </Pressable>
          <Pressable style={styles.signInBtn} onPress={onSubmit}>
            <Text style={styles.btnText}>로그인</Text>
          </Pressable>
        </View>
        <Pressable style={styles.signInBtn} onPress={signInWithKakao}>
          <Text style={styles.btnText}>카카오 로그인</Text>
        </Pressable>
        <Pressable style={styles.signInBtn} onPress={signInWithNaver}>
          <Text style={styles.btnText}>네이버 로그인</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    backgroundColor: '#0E1D0A',
  },
  entire: {
    flex: 1,
    backgroundColor: '#0E1D0A',
    marginHorizontal: 25,
  },
  logo: {
    fontSize: 60,
    marginTop: 170,
    color: '#94EE3A',
    fontFamily: 'PurplePurse-Regular',
    textAlign: 'center',
  },
  finding: {
    marginTop: 122,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  findBtn: {
    marginLeft: 10,
  },
  findText: {
    color: 'rgba(235, 225, 225, 0.8)',
    fontSize: 10,
  },
  typingText: {
    color: '#FFE3E3',
    fontSize: 13,
  },
  typingInput: {
    color: 'white',
    fontSize: 15,
    padding: 0,
    marginTop: 7,
    marginBottom: 18,
    borderBottomColor: '#EBAAAA',
    borderBottomWidth: 2,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 20,
    marginTop: 10,
  },
  signUpBtn: {
    flex: 1,
    height: 43,
    backgroundColor: '#E6CCCA',
    marginBottom: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtn: {
    flex: 1,
    height: 43,
    backgroundColor: '#94EE3A',
    marginBottom: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default SignIn;
