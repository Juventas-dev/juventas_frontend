import React, {useCallback, useRef, useState} from 'react';
import {
    View, Text, TextInput, Pressable,
    StyleSheet
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyBoardView';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignIn({navigation}: SignUpScreenProps){
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

    const onChangeName = useCallback(text => {
        setName(text.trim());
    }, []);
    const onChangeID = useCallback(text => {
        setID(text.trim());
    }, []);
    const onChangePass = useCallback(text => {
        setPass(text.trim());
    }, []);
    const onChangePassCheck = useCallback(text => {
        setPassCheck(text.trim());
    }, []);
    const onChangePhoneNum = useCallback(text => {
        setPhoneNum(text.trim());
    }, []);
    const onChangeCheckNum = useCallback(text => {
        setCheckNum(text.trim());
    }, []);
    const onSubmit = useCallback(() => {}, []);
    return (
        <DismissKeyboardView>
            <View style={styles.entire}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>juventas</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.title}>
                        <Text style={styles.titleHeader}>회원가입</Text>
                        <Text style={styles.titleBody}>
                            유벤타스에서는 회원님의 간단한 정보가 필요해요
                        </Text>
                    </View>
                    <View style={styles.typing}>
                        <Text style={styles.typingText}>이름</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            style={styles.typingInput}
                            autoCapitalize='none'
                            onChangeText={onChangeName}
                            textContentType="name"
                            value={Name}
                            clearButtonMode="while-editing"
                            ref={NameRef}
                            onSubmitEditing={() => IDRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.typingText}>아이디</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            style={styles.typingInput}
                            autoCapitalize='none'
                            onChangeText={onChangeID}
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
                            autoCapitalize='none'
                            onChangeText={onChangePass}
                            importantForAutofill="yes"
                            textContentType="password"
                            value={Pass}
                            clearButtonMode="while-editing"
                            ref={PassRef}
                            onSubmitEditing={() => PassCheckRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.typingText}>비밀번호 확인</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            secureTextEntry={true} 
                            style={styles.typingInput} 
                            autoCapitalize='none'
                            onChangeText={onChangePassCheck}
                            value={PassCheck}
                            clearButtonMode="while-editing"
                            ref={PassCheckRef}
                            onSubmitEditing={() => PhoneNumRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.typingText}>전화번호</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            style={styles.typingInput}
                            autoCapitalize='none'
                            onChangeText={onChangePhoneNum}
                            textContentType="telephoneNumber"
                            value={PhoneNum}
                            clearButtonMode="while-editing"
                            ref={PhoneNumRef}
                            onSubmitEditing={() => CheckNumRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.typingText}>인증번호</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            style={styles.typingInput}
                            autoCapitalize='none'
                            onChangeText={onChangeCheckNum}
                            value={CheckNum}
                            clearButtonMode="while-editing"
                            ref={CheckNumRef}
                            onSubmitEditing={onSubmit}
                        />
                    </View>
                    <View style={styles.btn}>
                        <Pressable style={styles.startBtn}>
                            <Text style={styles.btnText}>유벤타스 시작하기</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </DismissKeyboardView>
    )
}

const styles = StyleSheet.create({
    entire: {flex: 1, backgroundColor: '#0E1D0A', justifyContent: 'center'},
    header: {height: 60},
    headerText: {fontSize: 22, marginTop: 10, color: '#94EE3A', fontFamily: 'PurplePurse-Regular', marginLeft: 20},
    body: {height: 520, width: 360, paddingHorizontal: 20},
    title: {marginBottom: 15},
    titleHeader: {fontSize: 23, color: 'white'},
    titleBody: {color: '#C4C4C4', fontSize: 10, marginTop: 5},
    typing: {height: 380, marginHorizontal: 5},
    typingText: {height: 25, color: '#FFE3E3', fontSize: 13, fontFamily: 'NotoSansKR-Regular'},
    typingInput: {
        height: 25, 
        color: 'white', fontSize: 15,
        padding: 0, marginTop: 6, marginBottom: 3, marginHorizontal: 3, textAlignVertical: 'bottom',
        borderBottomColor: '#EBAAAA', borderBottomWidth: 2
    },
    btn: {height: 45, width: '100%', paddingHorizontal: 5},
    startBtn: {backgroundColor: '#94EE3A', height: '100%', width: '100%', justifyContent: 'center', borderRadius: 23},
    btnText: {color: 'black', textAlign: 'center'}
});