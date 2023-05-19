import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NoticeStackParamList} from '../navigations/NoticeNavigation';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type NoticeScreenProps = NativeStackScreenProps<NoticeStackParamList, 'Notice'>;

const Notice = ({navigation}: NoticeScreenProps) => {
  const [Notice, setNotice] = useState({date: '', title: '', content: ''});
  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/settings/announcement/:incr`,
        );
        setNotice(response.data);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getNotice();
  }, []);
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.Board}>
        <View style={styles.BoardTitle}>
          <Text style={styles.BoardTitleTxt}>{Notice.title}</Text>
        </View>
        <View style={styles.Date}>
          <Text style={{color: 'black', fontSize: 15}}>{Notice.date}</Text>
        </View>
        <View style={styles.BoardCt}>
          <Text style={styles.BoardCtTxt}>{Notice.content}</Text>
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
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoardTitleTxt: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  Date: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
  },
  BoardCt: {
    flex: 3,
    paddingHorizontal: 10,
  },
  BoardCtTxt: {
    color: '#4C4D4C',
  },
});
