import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageStackParamList} from '../navigations/MypageNavigation';

type MypageScreenProps = NativeStackScreenProps<
  MypageStackParamList,
  'MyKnowhow'
>;

const Myknowhow = ({navigation}: MypageScreenProps) => {
  return;
};

export default Myknowhow;
