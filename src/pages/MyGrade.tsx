import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageStackParamList} from '../navigations/MypageNavigation';

type MypageScreenProps = NativeStackScreenProps<
  MypageStackParamList,
  'MyGrade'
>;

const MyGrade = ({navigation}: MypageScreenProps) => {
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.grade}>
        <View style={styles.bar}>
          <Text>다음등급:~</Text>
        </View>
      </View>
      <View style={styles.GradeInf}>
        <Text style={styles.MyGradeInf}>현제 내 등급</Text>
        <Text style={styles.MyGradeInf_2}>어쩌구</Text>
      </View>
      <View style={styles.GradeInf}>
        <Text style={styles.MyGradeInf}>다음 등급까지</Text>
        <Text style={styles.MyGradeInf_2}>999포인트</Text>
      </View>
      <View style={styles.AllGrade}>
        <View style={styles.TopGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.MiddleGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.MiddleGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.MiddleGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.MiddleGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.MiddleGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.MiddleGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
        <View style={styles.LowGrade}>
          <Text style={styles.GradeName}>어쩌구</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyGrade;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  grade: {
    flex: 1,
    justifyContent: 'center',
  },
  bar: {
    backgroundColor: '#F9FAF8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GradeInf: {
    flex: 0.5,
    flexDirection: 'row',
  },
  MyGradeInf: {
    fontWeight: 'bold',
    color: '#346627',
    marginRight: 10,
  },
  MyGradeInf_2: {
    fontWeight: 'bold',
    color: '#4C4D4C',
  },
  AllGrade: {
    flex: 8,
    marginBottom: 1,
    justifyContent: 'space-around',
  },
  TopGrade: {
    flex: 1,
    backgroundColor: '#EBEFEA',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MiddleGrade: {
    flex: 1,
    backgroundColor: '#EBEFEA',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LowGrade: {
    flex: 1,
    backgroundColor: '#EBEFEA',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GradeName: {
    fontWeight: 'bold',
    color: '#3D3C3C',
  },
});
