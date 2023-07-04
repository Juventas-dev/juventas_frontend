import MultipleImagePicker, {
  ImageResults,
  MediaType,
} from '@baronha/react-native-multiple-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {HomeStackParamList} from '../navigations/HomeNavigation';
import {RootState} from '../store';
import CheckIcon from 'react-native-vector-icons/FontAwesome';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'TodayChk'>;

const TodayChk = ({navigation}: HomeScreenProps) => {
  const [images, setImages] = useState<ImageResults[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const now = new Date();
  const year = now.getFullYear(); // 년도
  const month = now.getMonth() + 1; // 월
  const date = now.getDate(); // 날짜
  const writeDone = useCallback(() => {
    setShowModal(true);
  }, []);

  const [myQuest, setMyQuest] = useState({
    category: '',
    middle_category: '',
    quest_name: 'quest_name',
    quest_id: 0,
    num_people: 0,
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
    console.log('1');
    console.log(userID);
    console.log(myQuest.quest_id);
    console.log(title);
    console.log(content);
    await axios.post(`${Config.API_URL}/quest/post`, {
      id: userID,
      q_id: myQuest.quest_id,
      title: title,
      content: content,
      img_path_1: undefined,
      img_path_2: undefined,
      img_path_3: undefined,
    });
    console.log('123');
    navigation.goBack();
  };

  useEffect(() => {
    const getQuest = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/quest/userquest/${userID}`,
        );
        console.log(response.data);
        setMyQuest(response.data);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getQuest();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.Background}>
        <View style={styles.questBodyDecided}>
          <View style={styles.myQuest}>
            <Text style={styles.questNum}>
              {myQuest.category} - {myQuest.middle_category}
            </Text>
            <Text style={styles.questName}>{myQuest.quest_name}</Text>
            <Text style={styles.howManyPeopleInQuest}>
              {myQuest.num_people}명이 이 퀘스트에 참여중입니다
            </Text>
          </View>
        </View>
        <View style={styles.Title}>
          <Text style={styles.title}>도전 기록하기</Text>
          <View style={styles.date}>
            <Text style={styles.dateft}>
              {year}년 {month}월 {date}일
            </Text>
          </View>
        </View>
        <View style={styles.board}>
          <Pressable
            android_ripple={{
              color: '#ffffff',
            }}
            style={styles.circle}
            onPress={selectImage}>
            <Icon name="camera-alt" color="white" size={24} />
          </Pressable>
          <TextInput
            style={styles.titleInput}
            placeholder="제목을 입력하세요"
            placeholderTextColor="#B7CBB2"
            multiline={true}
            value={title}
            onChangeText={onChangeTitleTd}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="내용을 입력하세요"
            placeholderTextColor="#B7CBB2"
            multiline={true}
            value={content}
            onChangeText={onChangeContentTd}
          />
        </View>
        <View>
          <Pressable style={styles.complete} onPress={writeDone}>
            <Text style={{color: '#346627'}}>작성 완료</Text>
          </Pressable>
        </View>
        <Modal transparent={true} visible={showModal}>
          <Pressable style={styles.modalBG} onPress={() => setShowModal(false)}>
            <View style={styles.modal}>
              <View style={styles.modalHead}>
                <CheckIcon
                  name="check-circle"
                  size={50}
                  color="#F6DD55"
                  style={styles.modalImg}
                />
                <Text style={styles.modalTextHeader}>
                  도전 기록 작성을 완료하시겠습니끼?
                </Text>
              </View>
              <View style={styles.Choose}>
                <Pressable style={styles.YesBt} onPress={() => uploadTd()}>
                  <Text style={styles.ChooseTxt}>예</Text>
                </Pressable>
                <Pressable
                  style={styles.NoBt}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.ChooseTxt}>아니요</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    backgroundColor: '#E7EBE4',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  upLoad: {
    color: '#1F6733',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
  },
  questBodyDecided: {
    alignItems: 'center',
    width: '100%',
    height: 120,
    flex: 1.5,
  },
  myQuest: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 35,
    width: '100%',
    height: '80%',
  },
  questNum: {
    color: '#1F6733',
    fontSize: 12,
    marginBottom: 2,
    fontWeight: '800',
  },
  questName: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '900',
  },
  howManyPeopleInQuest: {
    color: '#8D8D8D',
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
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
    fontWeight: '700',
  },
  title: {
    color: '#346627',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  board: {
    minHeight: 350,
    flex: 3,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  questTitle: {
    fontSize: 12,
    color: '#829B89',
    fontWeight: '700',
    paddingTop: 19,
    paddingBottom: 5,
  },
  titleInput: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 10,
  },
  Title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentInput: {
    color: '#575857',
    fontSize: 17,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 5,
  },
  circle: {
    backgroundColor: '#B7CBB2',
    borderRadius: 27,
    height: 49,
    width: 49,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 19,
    right: 10,
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
    marginBottom: 11,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dateft: {
    color: '#346627',
    fontSize: 17,
    fontWeight: '700',
  },
  complete: {
    backgroundColor: 'white',
    borderRadius: 7.5,
    height: 30,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#346627',
    borderWidth: 1,
    marginTop: 8,
  },
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 246,
    height: 181,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  modalHead: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImg: {
    marginTop: 3,
  },
  modalTextHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 9,
    color: '#8D8D8D',
    paddingHorizontal: 25,
    textAlign: 'center',
  },
  Choose: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  NoBt: {
    width: '49.5%',
    backgroundColor: '#346627',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 30,
  },
  YesBt: {
    width: '49.5%',
    backgroundColor: '#346627',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
  },
  ChooseTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TodayChk;
