import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ComplainStackParamList} from '../navigations/ComplainNavigation';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';

type ComplainScreenProps = NativeStackScreenProps<
  ComplainStackParamList,
  'ComplainAnswer'
>;

const ComplainAnswer = ({navigation}: ComplainScreenProps) => {
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.ComplainBoard}>
        <View style={styles.BoardTitle}>
          <Text style={styles.BoardTitleTxt}>문의의 제목</Text>
        </View>
        <View style={styles.BoardCt}>
          <Text style={styles.BoardCtTxt}>
            문의 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
            어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
            어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
          </Text>
        </View>
      </View>
      <View style={styles.AnswerBoard}>
        <View style={styles.AnsBoardTitle}>
          <Text style={styles.BoardTitleTxt}>문의에 대한 답변</Text>
        </View>
        <ScrollView>
          <View style={styles.BoardCt}>
            <Text style={styles.BoardCtTxt}>
              답변 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 답변
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 답변 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구답변 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구답변 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구답변 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구답변 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
              어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ComplainAnswer;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    flexWrap: 'nowrap',
    backgroundColor: '#F9FAF8',
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  ComplainBoard: {
    flex: 3,
    backgroundColor: 'white',
    borderRadius: 7,
    marginBottom: 15,
  },
  BoardTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoardTitleTxt: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  BoardCt: {
    flex: 3,
    paddingHorizontal: 10,
  },
  BoardCtTxt: {
    color: '#4C4D4C',
  },
  AnswerBoard: {
    flex: 5,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  AnsBoardTitle: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
