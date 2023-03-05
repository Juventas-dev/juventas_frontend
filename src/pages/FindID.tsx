import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  View
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
const IconQuestion = require('../../assets/image/question.png');
const IconExclamatation = require('../../assets/image/exclamation.png');


type FindIDScreenProps = NativeStackScreenProps<RootStackParamList, 'FindID'>;

function FindID({navigation}: FindIDScreenProps) {
  const [Name, setName] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');
  const NameRef = useRef<TextInput | null>(null);
  const PhoneNumRef = useRef<TextInput | null>(null);
  const [AfterFinding, setAfterFinding] = useState(false);
  const [userID, setUserID] = useState('');

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePhoneNum = useCallback((text: string) => {
    setPhoneNum(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/user/findId?name=${Name}&phone=${PhoneNum}`,
      );
      setAfterFinding(true);
      setUserID(response.data.id);
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    }
  }, [navigation, Name, PhoneNum]);

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.entire}>
        <View style={styles.header}>
          {AfterFinding
          ? (<Image source={IconExclamatation} style={styles.image}/>)
          : (<Image source={IconQuestion} style={styles.image}/>)}
          
          {AfterFinding
          ? (<View style={styles.typing}><Text style={styles.typingText}>회원님의 아이디는</Text>
          <Text style={styles.typingTextBold}>{userID}</Text>
          <Text style={styles.typingText}>입니다</Text></View>)
          : (<View style={styles.typing}><Text style={styles.typingText}>아이디를 잊으셨나요?</Text></View>)}
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
          onSubmitEditing={() => PhoneNumRef.current?.focus()}
        />}
        {!AfterFinding && <TextInput
          placeholder='전화번호'
          placeholderTextColor={'#B7CBB2'}
          selectionColor={'#346627'}
          style={styles.typingInput}
          autoCapitalize="none"
          onChangeText={onChangePhoneNum}
          keyboardType="number-pad"
          value={PhoneNum}
          clearButtonMode="while-editing"
          returnKeyType="done"
          ref={PhoneNumRef}
          onSubmitEditing={onSubmit}
        />}
        {AfterFinding
        ? (<Pressable style={styles.goBackToLogin} onPress={() => {navigation.navigate('SignIn')}}>
          <Text style={styles.btnText}>로그인으로 돌아가기</Text></Pressable>)
        : (<Pressable
          style={!Name || !PhoneNum ? styles.findBtn : styles.findBtn}
          onPress={onSubmit}
          disabled={!Name || !PhoneNum}>
          <Text style={styles.btnText}>확인</Text>
        </Pressable>)}
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
    marginTop: 50,
  },
  image: {
    width: 220,
    height: 270,
    marginBottom: 30
  },
  typing:{
    alignItems: 'center',
    marginBottom: 20
  },
  typingText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#346627',
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
    marginBottom: 18,
    backgroundColor: 'white',
    borderRadius: 10,
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
  goBackToLogin: {
    backgroundColor: '#B7CBB2',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 80,
  },
  btnText: {
    fontSize: 13,
    color: 'white',
  },
});

export default FindID;
