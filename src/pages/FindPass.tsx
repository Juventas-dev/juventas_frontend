import React, {ReactNode, useCallback, useRef, useState} from 'react';
import {
    View, Text, Pressable, TextInput,
    StyleSheet, Alert
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyBoardView';
import CheckIcon from 'react-native-vector-icons/FontAwesome';

type FindPassScreenProps = NativeStackScreenProps<RootStackParamList, 'FindPass'>;

export default function FindID({navigation}: FindPassScreenProps){
    const [modal, showModal] = useState(false);

    const [Name, setName] = useState('');
    const [ID, setID] = useState('');
    const [PhoneNum, setPhoneNum] = useState('');
    const [CheckNum, setCheckNum] = useState('');
    const NameRef = useRef<TextInput | null>(null);
    const IDRef = useRef<TextInput | null>(null);
    const PhoneNumRef = useRef<TextInput | null>(null);
    const CheckNumRef = useRef<TextInput | null>(null);

    const onChangeName = useCallback(text => {
        setName(text.trim());
    }, []);
    const onChangeID = useCallback(text => {
        setID(text.trim());
    }, []);
    const onChangePhoneNum = useCallback(text => {
        setPhoneNum(text.trim());
        // 숫자만 입력 가능하게 해야 할까?
    }, []);
    const onChangeCheckNum = useCallback(text => {
        setCheckNum(text.trim());
        // 숫자만 입력 가능하게 해야 할까?
    }, []);

    const getCheckNum = useCallback(() => {
        if (!PhoneNum) Alert.alert('알림', '전화번호를 입력해주세요')
        else {
            showModal(true);
        }
    }, []);
    // 인증번호 발행

    const onSubmit = useCallback(() => {Alert.alert('알림', '비밀번호 찾기')}, []);

    return (
        <DismissKeyboardView>
            <View style={styles.entire}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>juventas</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.typing}>
                        <Text style={styles.typingText}>이름</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            style={styles.typingInput}
                            autoCapitalize='none'
                            onChangeText={onChangeName}
                            textContentType="name"
                            value={Name}
                            blurOnSubmit={false}
                            clearButtonMode="while-editing"
                            ref={NameRef}
                            onSubmitEditing={() => IDRef.current?.focus()}
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
                            onSubmitEditing={() => PhoneNumRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.typingText}>전화번호</Text>
                        <View style={styles.checkNum}>
                            <TextInput 
                                selectionColor={'#DE7878'}
                                style={styles.typingInput}
                                autoCapitalize='none'
                                onChangeText={onChangePhoneNum}
                                value={PhoneNum}
                                clearButtonMode="while-editing"
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
                            autoCapitalize='none'
                            onChangeText={onChangeCheckNum}
                            keyboardType="number-pad"
                            value={CheckNum}
                            clearButtonMode="while-editing"
                            ref={CheckNumRef}
                            onSubmitEditing={onSubmit}
                        />
                    </View>
                    <View style={styles.btn}>
                        <Pressable 
                            style={
                                !Name || !ID || !PhoneNum || !CheckNum // 인증번호 확인하는 단계 필요
                                    ? styles.findBtn
                                    : StyleSheet.compose(styles.findBtn, styles.findBtnActive)
                            } 
                            onPress={onSubmit} 
                            disabled={!Name || !ID || !PhoneNum || !CheckNum}>
                            <Text style={styles.btnText}>비밀번호 찾기</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            {modal && (
                <Pressable
                style={styles.modalBG}
                onPress={() => showModal(false)}>
                    <View style={styles.modal}>
                        <CheckIcon name='check-circle' size={50} color='#94EE3A' style={styles.modalImg} />
                        <Text style={styles.modalTextHeader}>인증번호 발송</Text>
                        <Text style={styles.modalTextBody}>입력하신 번호로 인증번호가 발송되었습니다</Text>
                    </View>
                </Pressable>
            )}
        </DismissKeyboardView>
    )
}

const styles = StyleSheet.create({
    entire: {flex: 1, backgroundColor: '#0E1D0A', justifyContent: 'center'},
    header: {height: 60},
    headerText: {fontSize: 22, marginTop: 10, color: '#94EE3A', fontFamily: 'PurplePurse-Regular', marginLeft: 20, width: 90, textAlign: 'center'},
    body: {height: 520, width: 360, paddingHorizontal: 20},
    typing: {marginHorizontal: 5, marginBottom: 20},
    typingText: {height: 25, color: '#FFE3E3', fontSize: 13, fontFamily: 'NotoSansKR-Regular'},
    typingInput: {
        height: 25, 
        color: 'white', fontSize: 15,
        padding: 0, marginTop: 6, marginBottom: 15, marginHorizontal: 3, textAlignVertical: 'bottom',
        borderBottomColor: '#EBAAAA', borderBottomWidth: 2
    }, 
    checkNum: {width: '100%'},
    checkNumBtn: {
        position: 'absolute', 
        height: 20, width: 65, right: 3, top: 3,
        backgroundColor: '#E6CCCA', borderRadius: 10, 
        justifyContent: 'center' 
    },
    checkNumText: {fontSize: 8, fontFamily: 'NotoSansKR-Regular', top: -2, textAlign: 'center'},
    btn: {height: 45, width: '100%', paddingHorizontal: 5},
    findBtn: {backgroundColor: '#94EE3A', height: '100%', width: '100%', justifyContent: 'center', borderRadius: 23, opacity: 0.5},
    findBtnActive: {backgroundColor: '#94EE3A', height: '100%', width: '100%', justifyContent: 'center', borderRadius: 23, opacity: 1},
    btnText: {color: 'black', textAlign: 'center'},
    modalBG: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'transparent'},
    modal: {
        position: 'absolute', top : 160, right: 60, left: 60, bottom: 240,
        backgroundColor: 'white', borderRadius: 30,
        justifyContent: 'center', alignItems: 'center' 
    },
    modalImg: {marginTop: 3},
    modalTextHeader: {fontSize: 15, color: 'black', fontFamily: 'NotoSansKR-Bold', top: -2},
    modalTextBody: {fontSize: 10, color: '#8D8D8D', fontFamily: 'NotoSansKR-Regular', top: -10}
});