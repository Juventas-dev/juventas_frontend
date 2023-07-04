import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CertificationtStackParamList} from '../navigations/MycertificationNavigation';
import axios, {AxiosError} from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import Config from 'react-native-config';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CertificationScreenProps = NativeStackScreenProps<
  CertificationtStackParamList,
  'MyCertification'
>;

const MyCertification = ({navigation}: CertificationScreenProps) => {
  const [myCertification, setMyCertification] = useState([
    {content: '', q_name: '', t_date: '', title: ''},
  ]);

  const toContent = useCallback(() => {
    navigation.navigate('CertificationContent');
  }, [navigation]);

  interface DataItem {
    content: string;
    q_name: string;
    t_date: string;
    title: string;
  }

  const setTdIncr = useCallback((id: string) => {
    console.log(id);
    AsyncStorage.setItem('TdIncr', id, () => {
      console.log('저장완료');
    });
  }, []);

  const userID = useSelector((state: RootState) => state.user.id);
  useEffect(() => {
    const getCertification = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/mypage/myrecord/${userID}`,
        );
        console.log(response.data.record);
        setMyCertification(response.data.record);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getCertification();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  function Item({item, index}: {item: DataItem; index: number}) {
    const formattedDate = formatDate(item.t_date);
    return (
      <Pressable
        style={styles.Box1}
        onPress={() => {
          toContent();
          setTdIncr(index.toString());
        }}>
        <View style={styles.date}>
          <Text style={styles.dateTxt}>{formattedDate}</Text>
        </View>
        <View style={styles.Content}>
          <Text style={styles.ChallengeName}>{item.q_name}</Text>
          <View style={styles.Step}>
            <View style={styles.Step1} />
            <View style={styles.Step2} />
            <View style={styles.Step3} />
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.entire}>
      <FlatList<DataItem>
        data={myCertification}
        renderItem={Item}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default MyCertification;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: '#E7EBE4',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  Box1: {
    height: 200,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  date: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTxt: {
    color: '#346627',
    fontWeight: 'bold',
  },
  Content: {
    height: 150,
    width: '100%',
    backgroundColor: '#CFD8C8',
    borderRadius: 10,
    alignItems: 'center',
  },
  ChallengeName: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  Step: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Step1: {
    width: 80,
    height: 80,
    backgroundColor: '#935858',
  },
  Step2: {
    width: 80,
    height: 80,
    backgroundColor: '#DBBBBB',
  },
  Step3: {
    width: 80,
    height: 80,
    backgroundColor: '#DCCFF1',
  },
});
