import React, {useEffect, useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageStackParamList} from '../navigations/MypageNavigation';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import * as Progress from 'react-native-progress';

type MypageScreenProps = NativeStackScreenProps<MypageStackParamList>;

const MyGrade = ({navigation}: MypageScreenProps) => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [nextGrade, setNextGrade] = useState('');

  const userID = useSelector((state: RootState) => state.user.id);
  useEffect(() => {
    const getGrade = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/mypage/main/${userID}`,
        );
        setCurrentGrade(response.data.current_level);
        setNextGrade(response.data.next_level);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getGrade();
  }, []);

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.GradeInf}>
        <Text style={styles.MyGradeInf}>현제 내 등급</Text>
        <Text style={styles.MyGradeInf_2}>{currentGrade}</Text>
      </View>
      <View style={styles.GradeInf}>
        <Text style={styles.MyGradeInf}>다음 등급 ({nextGrade})까지</Text>
        <Text style={styles.MyGradeInf_2}>NN 도전 남음</Text>
      </View>
      <View style={styles.grade}>
        <Progress.Bar style={styles.bar}>
          <Text>다음등급:~</Text>
        </Progress.Bar>
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
    paddingTop: 15,
  },
  grade: {
    flex: 0.7,
    justifyContent: 'center',
  },
  bar: {
    width: '100%',
    backgroundColor: '#F9FAF8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
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
