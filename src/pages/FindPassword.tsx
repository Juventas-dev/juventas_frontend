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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckIcon from 'react-native-vector-icons/FontAwesome';

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

  const onSubmit = useCallback(() => {
    Alert.alert('알림', '비밀번호 찾기', [
      {
        text: '확인',
        onPress: () => navigation.goBack(),
      },
    ]);
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.entire}>
        <View style={styles.container}>
          <Text style={styles.logo}>juventas</Text>
          <Text style={styles.typingText}>이름</Text>
          <TextInput
            selectionColor={'#DE7878'}
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
          />
          <Text style={styles.typingText}>아이디</Text>
          <TextInput
            selectionColor={'#DE7878'}
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
          />
          <Text style={styles.typingText}>전화번호</Text>
          <View style={styles.checkNumContainer}>
            <TextInput
              selectionColor={'#DE7878'}
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
              <Text style={styles.checkNumText}>인증번호 받기</Text>
            </Pressable>
          </View>
          <Text style={styles.typingText}>인증번호</Text>
          <TextInput
            selectionColor={'#DE7878'}
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
          <Pressable
            style={
              !Name || !ID || !PhoneNum || !CheckNum // 인증번호 확인하는 단계 필요
                ? styles.findBtn
                : styles.findBtnActive
            }
            onPress={onSubmit}
            disabled={!Name || !ID || !PhoneNum || !CheckNum}>
            <Text style={styles.btnText}>비밀번호 찾기</Text>
          </Pressable>
        </View>
        <Modal transparent={true} visible={showModal}>
          <Pressable style={styles.modalBG} onPress={() => setShowModal(false)}>
            <View style={styles.modal}>
              <CheckIcon
                name="check-circle"
                size={50}
                color="#94EE3A"
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
    backgroundColor: '#0E1D0A',
  },
  entire: {
    flex: 1,
    backgroundColor: '#0E1D0A',
  },
  container: {
    marginHorizontal: 25,
  },
  logo: {
    fontSize: 24,
    color: '#94EE3A',
    fontFamily: 'PurplePurse-Regular',
    marginTop: 7.5,
    marginBottom: 45,
  },
  typingText: {
    fontSize: 13,
    color: '#FFE3E3',
  },
  typingInput: {
    fontSize: 15,
    color: 'white',
    padding: 0,
    marginTop: 7,
    marginBottom: 18,
    borderBottomColor: '#EBAAAA',
    borderBottomWidth: 2,
  },
  findBtn: {
    backgroundColor: 'rgba(148, 238, 58, 0.6)',
    height: 43,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 16,
  },
  findBtnActive: {
    backgroundColor: '#94EE3A',
    height: 43,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 16,
  },
  btnText: {
    fontSize: 13,
    color: 'black',
  },
  checkNumContainer: {
    width: '100%',
  },
  checkNumBtn: {
    position: 'absolute',
    height: 24,
    width: 82,
    right: 0,
    top: 7,
    backgroundColor: '#E6CCCA',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkNumText: {
    fontSize: 10,
    color: 'black',
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
