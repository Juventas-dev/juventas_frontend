import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NoticeStackParamList} from '../navigations/NoticeNavigation';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NoticeScreenProps = NativeStackScreenProps<
  NoticeStackParamList,
  'NoticeList'
>;

function NoticeList({navigation}: NoticeScreenProps) {
  const toNotice = useCallback(() => {
    navigation.navigate('Notice');
  }, [navigation]);
  const [fixedNotice, setFixedNotice] = useState({
    incr: 0,
    content: '',
    title: '',
  });
  const [Notice, setNotice] = useState([{incr: 0, title: ''}]);
  const userID = useSelector((state: RootState) => state.user.id);

  const setNoticeIncr = useCallback((text: string) => {
    console.log(text);
    AsyncStorage.setItem('notice', text, () => {
      console.log('저장완료');
    });
  }, []);

  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/settings/announcement`,
        );
        setFixedNotice(response.data.fixed[0]);
        setNotice(response.data.announce);
        console.log(1);
        console.log(response.data.fixed);
        console.log(response.data.announce);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getNotice();
  }, []);

  function header() {
    return (
      <Pressable
        style={styles.NoticeFix}
        onPress={() => {
          setNoticeIncr(String(fixedNotice.incr));
          navigation.navigate('Notice');
        }}>
        <Text style={styles.NoticeTitleFix}>{fixedNotice.title}</Text>
        <Text style={{color: '#4C4D4C', fontSize: 20}}>
          {fixedNotice.content}
        </Text>
      </Pressable>
    );
  }

  function NoTice({Item}) {
    console.log(0);
    console.log([Item]);
    return (
      <Pressable
        style={styles.NoticeBf}
        onPress={() => {
          setNoticeIncr(String(Item.incr));
          navigation.navigate('Notice');
        }}>
        <Text style={styles.NoticeTitle}>{Item.title}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.entire}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={Notice}
          keyExtractor={item => String(item.title)}
          renderItem={({item}) => <NoTice Item={item} />}
          ListHeaderComponent={header()}
        />
      </View>
    </SafeAreaView>
  );
}

export default NoticeList;

const styles = StyleSheet.create({
  entire: {
    backgroundColor: '#E7EBE4',
    flex: 1,
    paddingTop: 30,
  },
  NoticeFix: {
    backgroundColor: 'white',
    height: 190,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  NoticeTitleFix: {
    color: 'black',
    fontWeight: '900',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  NoticeBf: {
    backgroundColor: 'white',
    height: 38,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoticeTitle: {
    color: '#3D3C3C',
    fontWeight: '600',
    fontSize: 15,
  },
});
