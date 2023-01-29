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
    const [Name, ID, Pass, PassCheck, PhoneNum, CheckNum, setInput] = useState('');
    const NameRef = useRef<TextInput | null>(null);
    const IDRef = useRef<TextInput | null>(null);
    const PassRef = useRef<TextInput | null>(null);
    const PassCheckRef = useRef<TextInput | null>(null);
    const PhoneNumRef = useRef<TextInput | null>(null);
    const CheckNumRef = useRef<TextInput | null>(null);

    const onChangeInput = useCallback(text => {
        setInput(text.trim());
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
                            onChangeText={onChangeInput}
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
                            onChangeText={onChangeInput}
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
                            onChangeText={onChangeInput}
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
                            onChangeText={onChangeInput}
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
                            onChangeText={onChangeInput}
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
                            onChangeText={onChangeInput}
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
    // #0E1D0A
    entire: {flex: 1, backgroundColor: 'pink', justifyContent: 'center', paddingHorizontal: 20},
    header: {height: 50},
    headerText: {fontSize: 24, marginTop: 10, color: '#94EE3A', fontFamily: 'PurplePurse-Regular'},
    body: {height: 520, width: 360},
    title: {marginBottom: 10},
    titleHeader: {},
    titleBody: {},
    typing: {height: 480, marginHorizontal: 5},
    typingText: {height: 25, color: '#FFE3E3', fontSize: 13, fontFamily: 'NotoSansKR-Regular'},
    typingInput: {
        height: 25, 
        color: 'white', fontSize: 15,
        padding: 0, marginTop: 10, marginBottom: 5, marginHorizontal: 3, textAlignVertical: 'bottom',
        borderBottomColor: '#EBAAAA', borderBottomWidth: 2
    },
    btn: {},
    startBtn: {},
    btnText: {}
});