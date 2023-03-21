import {SettingStackParamList} from '../navigations/SettingNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type SettingScreenProps = NativeStackScreenProps<
  SettingStackParamList,
  'Notice'
>;

const Notice = ({navigation}: SettingScreenProps) => {
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.Board}>
        <View style={styles.BoardTitle}>
          <Text style={styles.BoardTitleTxt}>공지 제목</Text>
        </View>
        <View style={styles.BoardCt}>
          <Text style={styles.BoardCtTxt}>
            공지의 내용은 다음과 같습니다. 이벤트를 진행할 예정이니 모두 이렇게
            저렇게 참여해달라는 것입니다. 쓰면서 생각해보니 이벤트에 대한 것을
            볼 수 있는 곳도 있으면 좋을 것 같네요. 그 노하우 게시판 쪽을
            이용해볼까요..
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notice;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    flexWrap: 'nowrap',
    backgroundColor: '#F9FAF8',
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  Board: {
    backgroundColor: 'white',
    height: '70%',
    borderRadius: 7,
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
});
