import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  Modal
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyBoardView';
import axios, {AxiosError} from 'axios';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator} from 'react-native';
import Config from 'react-native-config';
const IconBasic = require('../../assets/image/fund.png');

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUp({navigation}: SignUpScreenProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState('');
  const [ID, setID] = useState('');
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

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangeID = useCallback((text: string) => {
    setID(text.trim());
  }, []);
  const onChangePass = useCallback((text: string) => {
    setPass(text.trim());
  }, []);
  const onChangePassCheck = useCallback((text: string) => {
    setPassCheck(text.trim());
  }, []);
  const onChangePhoneNum = useCallback((text: string) => {
    setPhoneNum(text.trim());
    // 숫자만 입력 가능하게 해야 할까?
  }, []);
  const onChangeCheckNum = useCallback((text: string) => {
    setCheckNum(text.trim());
    // 숫자만 입력 가능하게 해야 할까?
  }, []);

  const getCheckNum = useCallback(() => {
    if (!PhoneNum) {
      return Alert.alert('알림', '전화번호를 입력해주세요');
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(PhoneNum)) {
      return Alert.alert('알림', '올바른 전화번호를 입력해주세요');
    } else {
      setShowModal(true);
    }
  }, [PhoneNum]);
  // 인증번호 발행
  const canGoNext = Name && ID && Pass && PassCheck;
  /*PassCheck &&
    PhoneNum &&
    CheckNum &&
    Pass == PassCheck; */ // 인증번호 확인 단계도 거쳐야 함
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!Name || !Name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!ID || !ID.trim()) {
      return Alert.alert('알림', '아이디를 입력해주세요.');
    }
    if (!Pass || !Pass.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    /* if (!PassCheck) {
      return Alert.alert('알림', '비밀번호가 다릅니다.');
    } // 인증번호 확인 추가 */
    console.log(Name, ID, Pass, PhoneNum /*PassCheck*/);
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/user/signup`, {
        name: Name,
        id: ID,
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
  }, [navigation, loading, Name, ID, Pass, PhoneNum /*PassCheck*/]);
  return (
    <DismissKeyboardView>
      <View style={styles.entire}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Image source={IconBasic} style={styles.image} />
            <Text style={styles.titleHeader}>회원가입</Text>
            <Text style={styles.titleBody}>
              유벤타스에서는 회원님의 간단한 정보가 필요해요
            </Text>
          </View>
          <View style={styles.typing}>
            <TextInput
              placeholder='이름'
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
              placeholder='아이디'
              placeholderTextColor={'#B7CBB2'}
              selectionColor={'#346627'}
              style={styles.typingInput}
              autoCapitalize="none"
              onChangeText={onChangeID}
              textContentType="username"
              value={ID}
              clearButtonMode="while-editing"
              ref={IDRef}
              onSubmitEditing={() => PassRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder='비밀번호'
              placeholderTextColor={'#B7CBB2'}
              selectionColor={'#346627'}
              secureTextEntry={true}
              style={styles.typingInput}
              autoCapitalize="none"
              onChangeText={onChangePass}
              importantForAutofill="yes"
              textContentType="password"
              value={Pass}
              clearButtonMode="while-editing"
              ref={PassRef}
              onSubmitEditing={() => PassCheckRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder='비밀번호 확인'
              placeholderTextColor={'#B7CBB2'}
              selectionColor={'#346627'}
              secureTextEntry={true}
              style={styles.typingInput}
              autoCapitalize="none"
              onChangeText={onChangePassCheck}
              value={PassCheck}
              clearButtonMode="while-editing"
              ref={PassCheckRef}
              onSubmitEditing={() => PhoneNumRef.current?.focus()}
              blurOnSubmit={false}
            />
            <View style={styles.checkNumContainer}>
            <TextInput
              placeholder='전화번호'
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
              <Text style={styles.checkNumText}>인증</Text>
            </Pressable>
          </View>
          <TextInput
            placeholder='인증번호 입력'
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
          </View>
          <View style={styles.btn}>
            <Pressable
              style={ !canGoNext || loading ? styles.startBtn : styles.startBtnActive}
              disabled={!canGoNext || loading}
              onPress={onSubmit}>
              
                
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.btnText}>유벤타스 시작하기</Text>
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
              <Text style={styles.modalTextBody}>
                입력하신 번호로 인증번호가 발송되었습니다
              </Text>
            </View>
          </Pressable>
        </Modal>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1, 
    backgroundColor: '#F5F5F5', 
    justifyContent: 'center'
  },
  body: {
    paddingHorizontal: 20
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  image: {
    width: 140,
    height: 170,
    marginBottom: 15
  },
  titleHeader: {
    color: '#346627',
    fontSize: 25,
    fontWeight: '900'
  },
  titleBody: {
    color: '#346627',
    fontSize: 14,
    fontWeight: '600'
  },
  typing: {marginHorizontal: 5},
  typingText: {
    height: 25,
    color: '#FFE3E3',
    fontSize: 13,
  },
  typingInput: {
    padding: 5,
    paddingLeft: 10,
    color: '#346627',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    marginTop: 6,
    marginBottom: 3,
    marginHorizontal: 3,
  },
  checkNumContainer: {
    width: '100%',
  },
  checkNumBtn: {
    position: 'absolute',
    height: 24,
    width: 60,
    right: 10,
    top: 13,
    backgroundColor: '#B7CBB2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkNumText: {
    fontSize: 10,
    color: 'white',
  },
  btn: {height: 45, width: '100%', paddingHorizontal: 5, marginTop: 10},
  startBtn: {
    backgroundColor: '#B7CBB2',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  startBtnActive: {
    backgroundColor: '#346627',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: '700'
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
});
