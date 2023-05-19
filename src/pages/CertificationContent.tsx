import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CertificationtStackParamList} from '../navigations/MycertificationNavigation';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

type CertificationScreenProps = NativeStackScreenProps<
  CertificationtStackParamList,
  'CertificationContent'
>;

const QuestList = ({navigation}: CertificationScreenProps) => {
  const [myCertification, setMyCertification] = useState([
    {content: '', t_date: '', title: ''},
  ]);
  const userID = useSelector((state: RootState) => state.user.id);
  useEffect(() => {
    const getCertification = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/mypage/myrecord/${userID}`,
        );
        setMyCertification(response.data.record);
        console.log(myCertification);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getCertification();
  }, []);
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.QuestBox}>
        <Text style={styles.Quest}>건강</Text>
      </View>
      <View style={styles.ContentBox}>
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={styles.date}>
            <Text style={styles.dateTxt}>{myCertification.t_date}</Text>
          </View>
          <View style={styles.Title}>
            <Text style={styles.TitleTxt}>{myCertification.title}</Text>
          </View>
          <View>
            <Text style={styles.contentTxt}>{myCertification.content}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default QuestList;

const styles = StyleSheet.create({
  entire: {
    backgroundColor: '#E7EBE4',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  QuestBox: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7CBB2',
    height: 40,
  },
  Quest: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
  },
  ContentBox: {
    backgroundColor: 'white',
    minHeight: 500,
    borderRadius: 10,
    marginTop: 20,
  },
  date: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTxt: {
    color: '#346627',
    fontSize: 18,
  },
  Title: {
    height: 70,
  },
  TitleTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  contentTxt: {
    color: 'black',
    fontsize: 15,
  },
});
