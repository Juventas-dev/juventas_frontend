import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios, {AxiosError} from 'axios';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator} from 'react-native';
import Config from 'react-native-config';
import {Checkbox} from 'react-native-paper';
const IconBasic = require('../../assets/image/fund.png');

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUp({navigation}: SignUpScreenProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState('');
  const [Pass, setPass] = useState('');
  const [PassCheck, setPassCheck] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');
  const [CheckNum, setCheckNum] = useState('');
  const NameRef = useRef<TextInput | null>(null);
  const IDRef = useRef<TextInput | null>(null);
  const PassRef = useRef<TextInput | null>(null);
  const PassCheckRef = useRef<TextInput | null>(null);
  const PhoneNumRef = useRef<TextInput | null>(null);
  const CheckNumRef = useRef<TextInput | null>(null);
  const [alertCheckNum, setAlertCheckNum] = useState(false);

  const [AfterCheckNum, setAfterCheckNum] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePass = useCallback((text: string) => {
    setPass(text.trim());
  }, []);
  const onChangePassCheck = useCallback((text: string) => {
    setPassCheck(text.trim());
  }, []);
  const onChangePhoneNum = useCallback((text: string) => {
    setPhoneNum(text.trim());
    setAfterCheckNum(false);
  }, []);
  const onChangeCheckNum = useCallback((text: string) => {
    setCheckNum(text.trim());
  }, []);

  const getCheckNum = useCallback(async () => {
    if (!/^\d{3}\d{3,4}\d{4}$/.test(PhoneNum)) {
      return Alert.alert('알림', '올바른 전화번호를 입력하세요');
    } else {
      await axios.post(`${Config.API_URL}/user/postVerifyCode`, {
        phone: PhoneNum,
      });
      setShowModal(true);
    }
  }, [PhoneNum]);

  const onCheckNum = useCallback(async () => {
    if (!/^\d{6}$/.test(CheckNum)) {
      return setAlertCheckNum(true);
    } else {
      try {
        await axios.post(`${Config.API_URL}/user/confirmVerifyCode`, {
          phone: PhoneNum,
          verifyCode: CheckNum,
        });
        setAlertCheckNum(false);
        return setAfterCheckNum(true);
      } catch {
        return setAlertCheckNum(true);
      }
    }
  }, [CheckNum, PhoneNum]);

  const canGoNext =
    Name && Pass && Pass === PassCheck && AfterCheckNum && checked;

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!Name || !Name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!Pass || !Pass.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!PassCheck && PassCheck !== Pass) {
      return Alert.alert('알림', '비밀번호가 다릅니다.');
    }
    if (!PhoneNum || !PhoneNum.trim()) {
      return Alert.alert('알림', '전화번호를 입력해주세요.');
    }
    if (!AfterCheckNum) {
      return Alert.alert('알림', '전화번호를 인증해주세요.');
    }
    if (!checked) {
      return Alert.alert('알림', '이용약관에 동의해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/user/signup`, {
        name: Name,
        pwd: Pass,
        phone: PhoneNum,
        ///PassCheck,
      });
      console.log(response);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    Name,
    Pass,
    PassCheck,
    AfterCheckNum,
    checked,
    PhoneNum,
    navigation,
  ]);
  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <View style={styles.entire}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Image source={IconBasic} style={styles.image} />
            <Text style={styles.titleHeader}>회원가입</Text>
            <Text style={styles.titleBody}>
              하루도전에서는 회원님의 간단한 정보가 필요해요
            </Text>
          </View>
          <View style={styles.typing}>
            <TextInput
              placeholder="이름"
              placeholderTextColor={'#B7CBB2'}
              selectionColor={'#346627'}
              style={styles.typingInput}
              autoCapitalize="none"
              onChangeText={onChangeName}
              textContentType="name"
              value={Name}
              clearButtonMode="while-editing"
              ref={NameRef}
              onSubmitEditing={() => IDRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder="비밀번호"
              placeholderTextColor={'#B7CBB2'}
              selectionColor={'#346627'}
              secureTextEntry={true}
              style={
                PassCheck !== Pass ? styles.typingInputRed : styles.typingInput
              }
              autoCapitalize="none"
              onChangeText={onChangePass}
              importantForAutofill="yes"
              textContentType="password"
              value={Pass}
              clearButtonMode="while-editing"
              ref={PassRef}
              onSubmitEditing={() => PassCheckRef.current?.focus()}
              blurOnSubmit={false}
              keyboardType="number-pad"
              maxLength={4}
            />
            <Text style={styles.noticeTxt}>• 숫자 4자리로 입력해주세요</Text>
            <TextInput
              placeholder="비밀번호 확인"
              placeholderTextColor={'#B7CBB2'}
              selectionColor={'#346627'}
              secureTextEntry={true}
              style={
                PassCheck !== Pass ? styles.typingInputRed : styles.typingInput
              }
              autoCapitalize="none"
              onChangeText={onChangePassCheck}
              value={PassCheck}
              clearButtonMode="while-editing"
              ref={PassCheckRef}
              onSubmitEditing={() => PhoneNumRef.current?.focus()}
              blurOnSubmit={false}
              keyboardType="number-pad"
              maxLength={4}
            />
            {PassCheck !== Pass ? (
              <Text style={styles.noticeTxtRed}>
                • 비밀번호가 일치하지 않습니다. 다시 확인해주세요.
              </Text>
            ) : (
              <Text style={styles.noticeTxtRed} />
            )}
            <View style={styles.checkNumContainer}>
              <TextInput
                placeholder="전화번호"
                placeholderTextColor={'#B7CBB2'}
                selectionColor={'#346627'}
                style={styles.typingInput}
                autoCapitalize="none"
                onChangeText={onChangePhoneNum}
                value={PhoneNum}
                clearButtonMode="while-editing"
                returnKeyType="next"
                ref={PhoneNumRef}
                onSubmitEditing={() => CheckNumRef.current?.focus()}
                keyboardType="number-pad"
              />
              <Pressable onPress={getCheckNum} style={styles.checkNumBtn}>
                <Text style={styles.checkNumText}>인증번호 발송</Text>
              </Pressable>
            </View>
            <View style={styles.checkNumContainer}>
              <TextInput
                placeholder="인증번호 입력"
                placeholderTextColor={'#B7CBB2'}
                selectionColor={'#346627'}
                style={styles.typingInput}
                autoCapitalize="none"
                onChangeText={onChangeCheckNum}
                keyboardType="number-pad"
                value={CheckNum}
                clearButtonMode="while-editing"
                returnKeyType="done"
                ref={CheckNumRef}
                onSubmitEditing={onSubmit}
              />
              <Pressable onPress={onCheckNum} style={styles.checkNumBtn}>
                <Text style={styles.checkNumText}>인증</Text>
              </Pressable>
            </View>
            {alertCheckNum ? (
              <Text style={styles.wrong}>
                • 인증번호가 틀렸습니다. 다시 확인해주세요.
              </Text>
            ) : (
              <>
                {AfterCheckNum ? (
                  <Text style={styles.right}>• 인증이 완료되었습니다.</Text>
                ) : (
                  <Text style={styles.wrong} />
                )}
              </>
            )}
            <View>
              <View style={styles.agree}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color="#346627"
                />
                <Pressable onPress={() => setChecked(!checked)}>
                  <Text style={styles.agreement}>
                    회원가입 및 이용약관에 동의합니다
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.typingInput}
                onPress={() => navigation.navigate('Term')}>
                <Text style={styles.terms}>* 이용약관 확인하기</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.btn}>
            <Pressable
              style={
                !canGoNext || loading ? styles.startBtn : styles.startBtnActive
              }
              disabled={!canGoNext || loading}
              onPress={onSubmit}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.btnText}>하루도전 시작하기</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <Modal transparent={true} visible={showModal}>
        <Pressable style={styles.modalBG} onPress={() => setShowModal(false)}>
          <View style={styles.modal}>
            <CheckIcon
              name="check-circle"
              size={50}
              color="#F6DD55"
              style={styles.modalImg}
            />
            <Text style={styles.modalTextHeader}>인증번호 발송</Text>
            <Text style={styles.modalTextBody}>인증번호가 발송되었습니다</Text>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    backgroundColor: '#F5F5F5',
  },
  entire: {
    flex: 1,
    backgroundColor: 'whiteA',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: 20,
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 60,
    marginBottom: 15,
  },
  titleHeader: {
    color: '#346627',
    fontSize: 25,
    fontWeight: '900',
  },
  titleBody: {
    color: '#346627',
    fontSize: 14,
    fontWeight: '600',
  },
  typing: {marginHorizontal: 5},
  typingText: {
    height: 25,
    color: '#FFE3E3',
    fontSize: 18,
    fontWeight: '400',
  },
  typingInput: {
    padding: 5,
    paddingLeft: 10,
    color: '#346627',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 7,
    marginHorizontal: 3,
  },
  typingInputRed: {
    padding: 5,
    paddingLeft: 10,
    color: '#B74F38',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 7,
    marginHorizontal: 3,
  },
  noticeTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: '#346627',
    marginLeft: 15,
  },
  noticeTxtRed: {
    fontSize: 12,
    fontWeight: '400',
    color: '#B74F38',
    marginLeft: 15,
  },
  checkNumContainer: {
    width: '100%',
  },
  checkNumBtn: {
    position: 'absolute',
    height: 30,
    right: 10,
    top: 11,
    backgroundColor: '#B7CBB2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  checkNumText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  agree: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreement: {
    color: '#346627',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 3,
    top: -5,
  },
  terms: {
    color: '#B7CBB2',
    fontWeight: '400',
    fontSize: 18,
  },
  btn: {
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  startBtn: {
    backgroundColor: '#B7CBB2',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  startBtnActive: {
    backgroundColor: '#346627',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 50,
  },
  btnText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
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
  modalTextBody: {
    fontSize: 11,
    color: '#8D8D8D',
  },
  wrong: {
    fontSize: 12,
    fontWeight: '400',
    color: '#B74F38',
  },
  right: {
    fontSize: 12,
    fontWeight: '400',
    color: '#346627',
  },
});
