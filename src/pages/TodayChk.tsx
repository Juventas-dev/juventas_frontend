// import MultipleImagePicker, {
//     ImageResults,
//     MediaType,
//   } from '@baronha/react-native-multiple-image-picker';
  import {NativeStackScreenProps} from '@react-navigation/native-stack';
  import axios from 'axios';
  import React, {useCallback, useState, useEffect} from 'react';
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
    // const [images, setImages] = useState<ImageResults[]>([]);
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
  
    // const now = new Date();
    // const year = now.getFullYear(); // 년도
    // const month = now.getMonth() + 1; // 월
    // const date = now.getDate(); // 날짜
  
    // const userID = useSelector((state: RootState) => state.user.id);
  
    // const onChangeTitleTd = useCallback((text: string) => {
    //   setTitle(text);
    // }, []);
    // const onChangeContentTd = useCallback((text: string) => {
    //   setContent(text);
    // }, []);
  
    // const selectImage = async () => {
    //   const response = await MultipleImagePicker.openPicker({
    //     mediaType: MediaType.IMAGE,
    //     maxSelectedAssets: 3,
    //     doneTitle: '완료',
    //     cancelTitle: '취소',
    //     selectedAssets: images,
    //   });
    //   setImages(response);
    // };
    // useEffect(() => {
    //   const uploadTd = async () => {
    //     await axios.post(`${Config.API_URL}/quest/post`, {
    //       id: userID,
    //       q_id: 1,
    //       title: title,
    //       content: content,
    //     });
    //     navigation.goBack();
    //   };
    //   navigation.setOptions({
    //     headerRight: () => (
    //       <Pressable onPress={uploadTd}>
    //         <Text style={styles.upLoad}>오늘의 인증</Text>
    //       </Pressable>
    //     ),
    //   });
    // }, [content, navigation, title, userID]);
  
    return (
      <KeyboardAwareScrollView>
        {/* <SafeAreaView style={styles.Background}>
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
            <Text style={styles.dateft}>
              {year}년 {month}월 {date}일
            </Text>
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
            <Text style={styles.questTitle}>
              퀘스트 번호 3: 크리스마스 연말 음식 만들기
            </Text>
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
        </SafeAreaView> */}
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
    upLoad: {
      color: '#1F6733',
      fontSize: 18,
      fontWeight: '700',
      marginRight: 10,
    },
    questBodyDecided: {
      alignItems: 'center',
      paddingHorizontal: 20,
      width: '100%',
    },
    myQuest: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      marginTop: 5,
      marginBottom: 35,
      width: '100%',
      height: 151,
    },
    questNum: {
      color: '#1F6733',
      fontSize: 12,
      marginBottom: 2,
      fontWeight: '800',
    },
    questName: {
      color: 'black',
      fontSize: 24,
      marginBottom: 5,
      fontWeight: '800',
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
    },
    board: {
      minHeight: 500,
      width: 350,
      borderRadius: 10,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    questTitle: {
      fontSize: 12,
      color: '#829B89',
      fontWeight: '700',
      paddingHorizontal: 21,
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
      color: '#B7CBB2',
      fontSize: 17,
      fontWeight: '700',
    },
  });
  
  export default TodayChk;