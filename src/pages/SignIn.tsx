import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  Alert,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
  Image
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
import babelConfig from '../../babel.config';
const IconBasic = require('../../assets/image/fund.png');
const kakao = require('../../assets/image/KakaoTalk.png');
const naver = require('../../assets/image/Naver.png');

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

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.entire}>
        <View style={styles.header}>
        <Image source={IconBasic} style={styles.logo} />
        </View>
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
        <TextInput
          placeholder='아이디'
          placeholderTextColor={"#B7CBB2"}
          selectionColor={'#346627'}
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
        <TextInput
          placeholder='비밀번호'
          placeholderTextColor={"#B7CBB2"}
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
        />
        <View style={styles.btn}>
          <Pressable style={styles.signInBtn} onPress={onSubmit}>
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
          <Pressable style={styles.signUpBtn} onPress={toSignUp}>
            <Text style={styles.btnText}>회원가입</Text>
          </Pressable>
        </View>
        {/* <Pressable style={{position:'absolute', backgroundColor: 'black', top:300, bottom: 300, right:100, left:100}} onPress={() => (navigation.navigate('FirstSetting'))}></Pressable> */}
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
    marginTop: 50
  },
  logo: {
    width: 220,
    height: 270
  },
  finding: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  findBtn: {
    marginLeft: 10,
  },
  findText: {
    color: '#346627',
    fontSize: 10,
  },
  typingText: {
    color: '#FFE3E3',
    fontSize: 13,
    fontWeight: '700'
  },
  typingInput: {
    color: '#346627',
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btn: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  signUpBtn: {
    flex: 1,
    height: 35,
    backgroundColor: '#B7CBB2',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtn: {
    flex: 1,
    height: 35,
    backgroundColor: '#346627',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInKakaoBtn: {
    flex: 1,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#FFE812',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row'
  },
  signInNaverBtn: {
    flex: 1,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#00BF18',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row'
  },
  kakaoLogo: {
    width: 25,
    height: 25,
    marginLeft: 8,
    marginTop: 5
  },
  naverLogo: {
    width: 25,
    height: 25,
    marginLeft: 8
  },
  btnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  btnTextKakao: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
    width: '88%',
    textAlign:'center'
  },
  btnTextNaver: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    width: '88%',
    textAlign:'center'
  },
});

export default SignIn;
