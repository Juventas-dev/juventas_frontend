import React from 'react';
import {
    View, Text,
    StyleSheet
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyBoardView';

type FindPassScreenProps = NativeStackScreenProps<RootStackParamList, 'FindPass'>;

export default function FindID({navigation}: FindPassScreenProps){
    return (
        <DismissKeyboardView>
            <Text>비밀번호찾기</Text>
        </DismissKeyboardView>
    )
}

const styles = StyleSheet.create({

});