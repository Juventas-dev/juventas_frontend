import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  Modal,
  Image
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config'
const IconQuestion = require('../../assets/image/question.png');
const IconExclamatation = require('../../assets/image/exclamation.png');

type FindPassScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindPassword'
>;

function FindPassword({navigation}: FindPassScreenProps) {
  const [showModal, setShowModal] = useState(false);

  const [Name, setName] = useState('');
  const [ID, setID] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');
  const [CheckNum, setCheckNum] = useState('');
  const NameRef = useRef<TextInput | null>(null);
  const IDRef = useRef<TextInput | null>(null);
  const PhoneNumRef = useRef<TextInput | null>(null);
  const CheckNumRef = useRef<TextInput | null>(null);

  const [AfterFinding, setAfterFinding] = useState(false);
  const [userPassword, setUserPassword] = useState('');

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangeID = useCallback((text: string) => {
    setID(text.trim());
  }, []);
  const onChangePhoneNum = useCallback((text: string) => {
    setPhoneNum(text.trim());
  }, []);
  const onChangeCheckNum = useCallback((text: string) => {
    setCheckNum(text.trim());
  }, []);

  const getCheckNum = useCallback(() => {
    if (!PhoneNum) {
      Alert.alert('알림', '전화번호를 입력해주세요');
    } else {
      setShowModal(true);
    }
  }, [PhoneNum]);
  // 인증번호 발행

  const onSubmit = useCallback(async () => {
    try {
      const response = await axios.patch(`${Config.API_URL}/user/findPwd`, {
        id: ID,
        name: Name,
        phone: PhoneNum,
      });
      setAfterFinding(true);
      setUserPassword(response.data.pwd);
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    }
  }, [navigation, ID, Name, PhoneNum]);

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.entire}>
        <View style={styles.container}>
          <View style={styles.header}>
            {AfterFinding
            ? (<Image source={IconExclamatation} style={styles.image}/>)
            : (<Image source={IconQuestion} style={styles.image}/>)}
            {AfterFinding
            ? (<View style={styles.typing}><Text style={styles.typingText}>회원님의 임시 비밀번호는</Text>
            <Text style={styles.typingTextBold}>{userPassword}</Text>
            <Text style={styles.typingText}>입니다</Text>
            <Text style={styles.typingText}>꼭 비밀번호를 다시 설정해주세요</Text></View>)
            : (<Text style={styles.typingText}>비밀번호를 잊으셨나요?</Text>)}
          </View>
          {!AfterFinding && <TextInput
            placeholder='이름'
            placeholderTextColor={'#B7CBB2'}
            selectionColor={'#346627'}
            style={styles.typingInput}
            autoCapitalize="none"
            onChangeText={onChangeName}
            textContentType="name"
            value={Name}
            blurOnSubmit={false}
            clearButtonMode="while-editing"
            returnKeyType="next"
            ref={NameRef}
            onSubmitEditing={() => IDRef.current?.focus()}
          />}
          {!AfterFinding && <TextInput
            placeholder='아이디'
            placeholderTextColor={'#B7CBB2'}
            selectionColor={'#346627'}
            style={styles.typingInput}
            autoCapitalize="none"
            onChangeText={onChangeID}
            textContentType="username"
            value={ID}
            clearButtonMode="while-editing"
            returnKeyType="next"
            ref={IDRef}
            onSubmitEditing={() => PhoneNumRef.current?.focus()}
            blurOnSubmit={false}
          />}
          {!AfterFinding && <View style={styles.checkNumContainer}>
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
          </View>}
          {!AfterFinding && <TextInput
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
          />}
          <Pressable
            style={!AfterFinding ? styles.findBtn : styles.goBackToLogin}
            onPress={!AfterFinding ? onSubmit : () => (navigation.navigate('SignIn'))}
            disabled={!Name || !ID || !PhoneNum || !CheckNum}>
            {!AfterFinding
              ? <Text style={styles.btnText}>확인</Text>
              : <Text style={styles.btnText}>로그인으로 돌아가기</Text>}
          </Pressable>
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
  },
  container: {
    marginHorizontal: 25,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 220,
    height: 270,
    marginBottom: 15
  },
  typing:{
    alignItems: 'center'
  },
  typingText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#346627',
    marginBottom: 15
  },
  typingTextBold: {
    fontSize: 20,
    fontWeight: '900',
    color: '#346627'
  },
  typingInput: {
    fontSize: 15,
    color: '#346627',
    padding: 5,
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  findBtn: {
    backgroundColor: '#346627',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 16,
  },
  btnText: {
    fontSize: 13,
    color: 'white',
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
  goBackToLogin: {
    backgroundColor: '#B7CBB2',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 80,
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

export default FindPassword;
