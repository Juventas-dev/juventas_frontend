import React, {useCallback, useRef, useState} from 'react';
import {
    View, Text, Pressable, TextInput,
    StyleSheet,
    Alert
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyBoardView';

type FindIDScreenProps = NativeStackScreenProps<RootStackParamList, 'FindID'>;

export default function FindID({navigation}: FindIDScreenProps){
    const [Name, setName] = useState('');
    const [PhoneNum, setPhoneNum] = useState('');
    const NameRef = useRef<TextInput | null>(null);
    const PhoneNumRef = useRef<TextInput | null>(null);

    const onChangeName = useCallback(text => {
        setName(text.trim());
    }, []);
    const onChangePhoneNum = useCallback(text => {
        setPhoneNum(text.trim());
        // 숫자만 입력 가능하게 해야 할까?
    }, []);

    const onSubmit = useCallback(() => {Alert.alert('알림', '아이디 찾기')}, []);

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
                            onSubmitEditing={() => PhoneNumRef.current?.focus()}
                        />
                        <Text style={styles.typingText}>전화번호</Text>
                        <TextInput 
                            selectionColor={'#DE7878'}
                            style={styles.typingInput}
                            autoCapitalize='none'
                            onChangeText={onChangePhoneNum}
                            keyboardType="number-pad"
                            value={PhoneNum}
                            clearButtonMode="while-editing"
                            ref={PhoneNumRef}
                            onSubmitEditing={onSubmit}
                        />
                    </View>
                    <View style={styles.btn}>
                        <Pressable 
                            style={
                                !Name || !PhoneNum
                                    ? styles.findBtn
                                    : StyleSheet.compose(styles.findBtn, styles.findBtnActive)
                            } 
                            onPress={onSubmit} 
                            disabled={!Name || !PhoneNum}>
                            <Text style={styles.btnText}>아이디 찾기</Text>
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
    btn: {height: 45, width: '100%', paddingHorizontal: 5},
    findBtn: {backgroundColor: '#94EE3A', height: '100%', width: '100%', justifyContent: 'center', borderRadius: 23, opacity: 0.5},
    findBtnActive: {backgroundColor: '#94EE3A', height: '100%', width: '100%', justifyContent: 'center', borderRadius: 23, opacity: 1},
    btnText: {color: 'black', textAlign: 'center'}
});