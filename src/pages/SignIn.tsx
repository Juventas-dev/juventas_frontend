import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
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
const IconBasic = require('../../assets/image/fund.png');
const kakao = require('../../assets/image/KakaoTalk.png');
const naver = require('../../assets/image/Naver.png');

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  const [Pass, setPass] = useState('');
  const [focused, setFocused] = useState(false);
  const PhoneRef = useRef<TextInput | null>(null);
  const PassRef = useRef<TextInput | null>(null);
  const [alertPhoneNum, setAlertPhoneNum] = useState(false);
  const [alertPass, setAlertPass] = useState(false);
  const onChangePhone = useCallback((text: string) => {
    setPhone(text.trim());
  }, []);
  const onChangePass = useCallback((text: string) => {
    setPass(text.trim());
  }, []);
  const onSubmit = useCallback(async () => {
    setAlertPhoneNum(false);
    setAlertPass(false);
    if (!phone || !phone.trim()) {
      return setAlertPhoneNum(true);
    } else if (!/^\d{3}\d{3,4}\d{4}$/.test(phone)) {
      return setAlertPhoneNum(true);
    }
    if (!Pass || !Pass.trim()) {
      return setAlertPass(true);
    } else if (!/^\d{4}$/.test(Pass)) {
      return setAlertPass(true);
    }
    try {
      console.log(`${Config.API_URL}/user/login`);
      const response = await axios.post(`${Config.API_URL}/user/login`, {
        phone: phone,
        pwd: Pass,
      });
      console.log(response);
      dispatch(
        userSlice.actions.setUser({
          name: response.data.name,
          id: response.data.id,
          loginType: 'custom',
          accessToken: response.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.refreshToken,
      );

      const deviceToken = await EncryptedStorage.getItem('deviceToken');

      await axios.post(`${Config.API_URL}/push/register`, {
        id: response.data.id,
        deviceToken: deviceToken,
      });
    } catch (error) {
      const errorResponse = (
        error as AxiosError<{error: string; message: string}>
      ).response;
      console.error(errorResponse);
      if (errorResponse?.data.error === 'phone') {
        setAlertPhoneNum(true);
      } else {
        setAlertPass(true);
      }
    }
  }, [dispatch, phone, Pass]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
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
      const response = await axios.post(`${Config.API_URL}/user/signup`, {
        name: profile.nickname,
        id: 'kakao' + profile.id,
      });
      console.log(response);

      const deviceToken = await EncryptedStorage.getItem('deviceToken');

      await axios.post(`${Config.API_URL}/push/register`, {
        id: response.data.id,
        deviceToken: deviceToken,
      });
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
        const response = await axios.post(`${Config.API_URL}/user/signup`, {
          name: profile.response.name,
          id: 'naver' + profile.response.id,
        });
        console.log(response);

        const deviceToken = await EncryptedStorage.getItem('deviceToken');

        await axios.post(`${Config.API_URL}/push/register`, {
          id: response.data.id,
          deviceToken: deviceToken,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.entire}>
        <View style={!focused ? styles.header : styles.headerFocused}>
          <Image
            source={IconBasic}
            style={!focused ? styles.logo : styles.focusedLogo}
          />
        </View>
        <View style={!focused ? styles.finding : styles.findingFocused}>
          {/* 비밀번호 찾기 */}
          <Pressable onPress={toFindPass} style={styles.findBtn}>
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </Pressable>
        </View>
        {/* 비밀번호 입력 */}
        <TextInput
          placeholder="전화번호"
          placeholderTextColor={'#B7CBB2'}
          selectionColor={'#346627'}
          style={styles.typingInput}
          autoCapitalize="none"
          onChangeText={onChangePhone}
          importantForAutofill="yes"
          autoComplete="username"
          textContentType="username"
          value={phone}
          clearButtonMode="while-editing"
          returnKeyType="next"
          ref={PhoneRef}
          onSubmitEditing={() => PassRef.current?.focus()}
          blurOnSubmit={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {alertPhoneNum ? (
          <Text style={styles.wrong}>
            • 사용자 정보가 없습니다. 입력한 전화번호를 다시 확인해주세요.
          </Text>
        ) : (
          <Text style={styles.wrong} />
        )}
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor={'#B7CBB2'}
          selectionColor={'#346627'}
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {alertPass ? (
          <Text style={styles.wrong}>
            • 비밀번호가 틀렸습니다. 다시 입력해주세요.
          </Text>
        ) : (
          <Text style={styles.wrong} />
        )}
        <View style={styles.btn}>
          <Pressable
            style={focused ? styles.signInBtn : styles.signUpBtn}
            onPress={onSubmit}>
            <Text style={styles.btnText}>로그인</Text>
          </Pressable>
          <Pressable style={styles.signInKakaoBtn} onPress={signInWithKakao}>
            <Image source={kakao} style={styles.kakaoLogo} />
            <Text style={styles.btnTextKakao}>카카오 로그인</Text>
          </Pressable>
          <Pressable style={styles.signInNaverBtn} onPress={signInWithNaver}>
            <Image source={naver} style={styles.naverLogo} />
            <Text style={styles.btnTextNaver}>네이버 로그인</Text>
          </Pressable>
          <Pressable style={styles.signInBtn} onPress={toSignUp}>
            <Text style={styles.btnText}>회원가입</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    backgroundColor: '#F5F5F5',
  },
  entire: {
    flex: 1,
    marginHorizontal: 25,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerFocused: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 220,
    height: 270,
  },
  focusedLogo: {
    width: 172,
    height: 210,
  },
  finding: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  findingFocused: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  findBtn: {
    marginLeft: 10,
  },
  findText: {
    color: '#346627',
    fontSize: 15,
    fontWeight: '400',
  },
  typingText: {
    color: '#FFE3E3',
    fontSize: 13,
    fontWeight: '700',
  },
  typingInput: {
    color: '#346627',
    fontSize: 18,
    padding: 5,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 5,
    backgroundColor: 'white',
    fontWeight: '400',
    borderRadius: 10,
    height: 40,
  },
  wrong: {
    fontSize: 12,
    fontWeight: '400',
    color: '#B74F38',
  },
  btn: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  signUpBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#B7CBB2',
    marginBottom: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#346627',
    marginBottom: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInKakaoBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFE812',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    flexDirection: 'row',
  },
  signInNaverBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#00BF18',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    flexDirection: 'row',
  },
  kakaoLogo: {
    width: 20,
    height: 20,
    marginLeft: 19,
    marginTop: 5,
  },
  naverLogo: {
    width: 30,
    height: 29,
    marginLeft: 13,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  btnTextKakao: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    width: '88%',
    textAlign: 'center',
  },
  btnTextNaver: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    width: '88%',
    textAlign: 'center',
  },
});

export default SignIn;
