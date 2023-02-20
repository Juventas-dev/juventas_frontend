import MultipleImagePicker, {
  ImageResults,
  MediaType,
} from '@baronha/react-native-multiple-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Config from 'react-native-config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {HomeStackParamList} from '../navigations/HomeNavigation';
import {RootState} from '../store';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'TodayChk'>;

const TodayChk = ({navigation}: HomeScreenProps) => {
  const [images, setImages] = useState<ImageResults[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const now = new Date();
  const year = now.getFullYear(); // 년도
  const month = now.getMonth() + 1; // 월
  const date = now.getDate(); // 날짜
  const [form, setForm] = useState({
    Date: `${year}년 ${month}월 ${date}일`,
  });

  const userID = useSelector((state: RootState) => state.user.id);

  const onChangeTitleTd = useCallback((text: string) => {
    setTitle(text);
  }, []);
  const onChangeContentTd = useCallback((text: string) => {
    setContent(text);
  }, []);

  const selectImage = async () => {
    const response = await MultipleImagePicker.openPicker({
      mediaType: MediaType.IMAGE,
      maxSelectedAssets: 3,
      doneTitle: '완료',
      cancelTitle: '취소',
      selectedAssets: images,
    });
    setImages(response);
  };

  const uploadTd = async () => {
    await axios.post(`${Config.API_URL}/quest/post`, {
      id: userID,
      //  t_date: ,
      q_id: 0,
      title: title,
      content: content,
      //img_path_1: 비워두셈
      //img_path_2: 비워두셈
      //img_path_3: 비워두셈
    });
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.Background}>
        <View style={styles.topContainer}>
          <Pressable style={styles.backBt} onPress={() => navigation.goBack()}>
            <Icon name="left" color="#346627" size={18} />
            <Text style={styles.back}>뒤로</Text>
          </Pressable>
          <Text style={styles.titleHeader}>글쓰기</Text>
          <Pressable style={styles.upLoadBt} onPress={uploadTd}>
            <Text style={styles.upLoad}>오늘의 인증</Text>
          </Pressable>
        </View>
        <View style={styles.questBodyDecided}>
          <View style={styles.myQuest}>
            <Text style={styles.questNum}>퀘스트 번호 3</Text>
            <Text style={styles.questName}>크리스마스 연말 음식 만들기</Text>
            <Text style={styles.howManyPeopleInQuest}>
              136명이 이 퀘스트에 참여중입니다
            </Text>
            <Pressable style={styles.submitQuestTodayBtn}>
              <Text style={styles.submitQuestTodayTxt}>오늘의 인증</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.title}>활동기록 작성하기</Text>
        <View style={styles.date}>
          <Text style={styles.dateft}>{form.Date}</Text>
        </View>
        <View style={styles.board}>
          <View style={styles.boardTitle}>
            <View style={styles.Qn}>
              <Text style={styles.questTitle}>
                퀘스트 번호 3: 크리스마스 연말 음식 만들기
              </Text>
            </View>
            <View style={styles.Ct}>
              <TextInput
                style={styles.titleInput}
                placeholder="제목을 입력하세요"
                placeholderTextColor="#B7CBB2"
                multiline={true}
                value={title}
                onChangeText={onChangeTitleTd}
              />
              <Pressable
                android_ripple={{
                  color: '#ffffff',
                }}
                style={styles.circle}
                onPress={selectImage}>
                <Icon name="camera-alt" color="white" size={24} />
              </Pressable>
            </View>
          </View>
          <View style={styles.contentBoard}>
            <TextInput
              style={styles.contentInput}
              placeholder="내용을 입력하세요"
              placeholderTextColor="#B7CBB2"
              multiline={true}
              value={content}
              onChangeText={onChangeContentTd}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    backgroundColor: '#F9FAF8',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  topContainer: {
    width: 350,
    height: 24,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleHeader: {
    flex: 1,
    color: '#1F6733',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
    textAlign: 'center',
  },
  upLoadBt: {
    flex: 1,
    heigth: 18,
    alignItems: 'flex-end',
    marginTop: 3,
  },
  backBt: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 3,
  },
  upLoad: {
    color: '#1F6733',
    fontSize: 15,
    fontWeight: 'bold',
  },
  back: {
    color: '#1F6733',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  questBodyDecided: {
    flex: 10,
    alignItems: 'center',
    width: 350,
  },
  myQuest: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 15,
    marginTop: 5,
    marginBottom: 30,
    width: '100%',
  },
  questNum: {
    color: '#1F6733',
    fontSize: 12,
    marginBottom: 2,
  },
  questName: {
    color: 'black',
    fontSize: 24,
    marginBottom: 5,
  },
  howManyPeopleInQuest: {
    color: '#8D8D8D',
    fontSize: 12,
    marginBottom: 8,
  },
  submitQuestTodayBtn: {
    backgroundColor: '#1F6733',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 35,
  },
  submitQuestTodayTxt: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    color: '#346627',
    fontSize: 15,
    fontWeight: 'bold',
  },
  board: {
    height: 572,
    width: 350,
    borderRadius: 10,
    flexDirection: 'column',
  },
  Qn: {
    height: 21,
  },
  questTitle: {
    fontSize: 14,
    color: '#829B89',
    marginLeft: 10,
  },
  Ct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boardTitle: {
    flex: 2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  contentBoard: {
    flex: 13,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
  },
  titleInput: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentInput: {
    marginLeft: 5,
    fontSize: 17,
  },
  circle: {
    backgroundColor: '#B7CBB2',
    borderRadius: 27,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
    marginTop: 7,
  },
  listBt: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 5,
    flex: 1,
    borderRadius: 10,
  },
  categoryList: {
    fontSize: 18,
    color: '#B7CBB2',
    marginLeft: 10,
  },
  categoryIcon: {
    marginRight: 15,
  },
  date: {
    width: 180,
    alignItems: 'center',
    marginBottom: 7,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dateft: {
    color: '#B7CBB2',
  },
});

export default TodayChk;
