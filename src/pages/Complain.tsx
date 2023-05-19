import {SettingStackParamList} from '../navigations/SettingNavigation';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useCallback} from 'react';
import {ComplainStackParamList} from '../navigations/ComplainNavigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type ComplainScreenProps = NativeStackScreenProps<
  ComplainStackParamList,
  'Complain'
>;

function Complain({navigation}: ComplainScreenProps) {
  const toComplainAnswer = useCallback(() => {
    navigation.navigate('ComplainAnswer');
  }, [navigation]);
  const toNewComplain = useCallback(() => {
    navigation.navigate('NewComplain');
  }, [navigation]);
  return (
    <SafeAreaView style={styles.entire}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Pressable style={styles.QuestionBoxFr} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>자주 묻는 질문{')'}</Text>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBoxFr} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>자주 묻는 질문{')'}</Text>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBoxFr} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>자주 묻는 질문{')'}</Text>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
        <Pressable style={styles.QuestionBox} onPress={toComplainAnswer}>
          <Text style={styles.QuestionTxt}>어쩌구 저쩌구 질문</Text>
        </Pressable>
      </ScrollView>
      <Pressable style={styles.newComplainBtn}>
        <FontAwesome5Icon
          name="pen-nib"
          size={30}
          color="white"
          onPress={toNewComplain}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            marginTop: 3,
          }}>
          문의 작성
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Complain;

const styles = StyleSheet.create({
  entire: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 30,
  },
  QuestionBoxFr: {
    backgroundColor: '#346627',
    flexDirection: 'row',
    paddingLeft: 5,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  QuestionBox: {
    backgroundColor: '#B7CBB2',
    flexDirection: 'row',
    paddingLeft: 5,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  QuestionTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  newComplainBtn: {
    backgroundColor: '#346627',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
