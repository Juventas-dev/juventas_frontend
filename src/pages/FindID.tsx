import React from 'react';
import {
    View, Text,
    StyleSheet
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyBoardView';

type FindIDScreenProps = NativeStackScreenProps<RootStackParamList, 'FindID'>;

export default function FindID({navigation}: FindIDScreenProps){
    return (
        <DismissKeyboardView>
            <Text>아이디찾기</Text>
        </DismissKeyboardView>
    )
}

const styles = StyleSheet.create({

});