import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type FindIDScreenProps = NativeStackScreenProps<RootStackParamList, 'FindID'>;

function FindID({navigation}: FindIDScreenProps) {
  const [Name, setName] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');
  const NameRef = useRef<TextInput | null>(null);
  const PhoneNumRef = useRef<TextInput | null>(null);

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePhoneNum = useCallback((text: string) => {
    setPhoneNum(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    Alert.alert('알림', '아이디 찾기', [
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
            onSubmitEditing={() => PhoneNumRef.current?.focus()}
          />
          <Text style={styles.typingText}>전화번호</Text>
          <TextInput
            selectionColor={'#DE7878'}
            style={styles.typingInput}
            autoCapitalize="none"
            onChangeText={onChangePhoneNum}
            keyboardType="number-pad"
            value={PhoneNum}
            clearButtonMode="while-editing"
            returnKeyType="done"
            ref={PhoneNumRef}
            onSubmitEditing={onSubmit}
          />
          <Pressable
            style={!Name || !PhoneNum ? styles.findBtn : styles.findBtnActive}
            onPress={onSubmit}
            disabled={!Name || !PhoneNum}>
            <Text style={styles.btnText}>아이디 찾기</Text>
          </Pressable>
        </View>
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
});

export default FindID;
