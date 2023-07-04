import React, {useCallback, useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import {HomeStackParamList} from '../navigations/HomeNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function Home({navigation}: HomeScreenProps) {
  const [seqCount, setSeqCount] = useState(0);
  const [completedNum, setCompletedNUm] = useState(0);
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState('');
  const [levelTxt, setLevelTxt] = useState('');
  const [levelImage, setImage] = useState<any>();
  const [questSelected, setQuestSelected] = useState('F');
  const [allQuestData, setAllQuestData] = useState([
    {incr: 0, q_name: 'q_name'},
    {incr: 1, q_name: 'q_name'},
    {incr: 2, q_name: 'q_name'},
    {incr: 3, q_name: 'q_name'},
    {incr: 4, q_name: 'q_name'},
    {incr: 5, q_name: 'q_name'},
    {incr: 6, q_name: 'q_name'},
    {incr: 7, q_name: 'q_name'},
    {incr: 8, q_name: 'q_name'},
  ]);
  const [questNum, setQuestNum] = useState(0);
  const [myQuest, setMyQuest] = useState({
    questCategory: 'category',
    questMidCategory: 'midCategory',
    quest_name: 'quest_name',
    quest_id: 0,
    num_people: 0,
  });
  const [boardData, setBoardData] = useState([]);
  const [whichPost, setWhichPost] = useState(0);
  const imageArray = {
    Level_1: require('../../assets/image/Lv1.png'),

    Level_2: require('../../assets/image/Lv2.png'),

    Level_3: require('../../assets/image/Lv3.png'),

    Level_4: require('../../assets/image/Lv4.png'),

    Level_5: require('../../assets/image/Lv5.png'),

    Level_6: require('../../assets/image/Lv6.png'),
  };
  const userID = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    getQuestSelectedOrNot();
    getBoardData();
  }, [questSelected]);

  const getQuestSelectedOrNot = useCallback(async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/quest/questselected/${userID}`,
      );
      console.log('^^');
      console.log(response.data.is_selected);
      setQuestSelected(response.data.is_selected);
      getQuestData();
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  }, [questSelected]);

  const getQuestData = useCallback(async () => {
    try {
      console.log('%%');
      console.log(questSelected);
      const response = await axios.get(
        `${Config.API_URL}/quest/userquest/${userID}`,
      );
      console.log('***');
      console.log(response.data);
      if (questSelected === 'T') {
        setMyQuest({
          questCategory: response.data.category,
          questMidCategory: response.data.middle_category,
          quest_name: response.data.quest_name,
          quest_id: response.data.quest_id,
          num_people: response.data.num_people,
        });
      } else {
        setAllQuestData(response.data.recommend);
      }
      setLevel(response.data.level);
      console.log('&&');
      console.log(level);
      setSeqCount(response.data.seq_count);
      console.log(seqCount);
      setCompletedNUm(response.data.quest_completed);
      console.log(completedNum);
      setPoint(response.data.point);
      console.log(point);
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  }, [
    questSelected,
    allQuestData,
    level,
    seqCount,
    completedNum,
    point,
    myQuest,
  ]);

  const getBoardData = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/board/bestpost?id='${userID}'`,
      );
      console.log(response.data);
      setBoardData(response.data.bestPost);
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  };

  const getSrc = useCallback(() => {
    if (levelTxt === 'Level_1') {
      setImage(imageArray.Level_1);
    } else if (levelTxt === 'Level_2') {
      setImage(imageArray.Level_2);
    } else if (levelTxt === 'Level_3') {
      setImage(imageArray.Level_3);
    } else if (levelTxt === 'Level_4') {
      setImage(imageArray.Level_4);
    } else if (levelTxt === 'Level_5') {
      setImage(imageArray.Level_5);
    } else {
      setImage(imageArray.Level_6);
    }
  }, [levelTxt, levelImage]);

  const getImage = useCallback((lev: string) => {
    if (lev.includes('씨앗') === true) {
      setLevelTxt('Level_1');
    } else if (lev.includes('새싹') === true) {
      setLevelTxt('Level_2');
    } else if (lev.includes('묘목') === true) {
      setLevelTxt('Level_3');
    } else if (lev.includes('나무') === true) {
      setLevelTxt('Level_4');
    } else if (lev.includes('꽃') === true) {
      setLevelTxt('Level_5');
    } else {
      setLevelTxt('Level_6');
    }
  }, []);

  useEffect(() => {
    getImage(level);
    getSrc();
  }, [level, getImage, getSrc]);

  const selectQuest = async (num: number) => {
    console.log('^^');
    try {
      await axios.post(`${Config.API_URL}/quest/userquest`, {
        id: userID,
        q_id: allQuestData[num].incr,
      });
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  };

  const resetQuest = useCallback(async () => {
    try {
      await axios.patch(`${Config.API_URL}/quest/questreselect`, {
        id: userID,
      });
      setQuestSelected('F');
      setMyQuest({
        questCategory: 'category',
        questMidCategory: 'midCategory',
        quest_name: 'quest_name',
        quest_id: 0,
        num_people: 0,
      });
      getQuestData();
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  }, [questSelected, myQuest, allQuestData]);

  const nextQuestList = useCallback(() => {
    if (questNum === 2) {
      setQuestNum(0);
    } else {
      setQuestNum(questNum + 1);
    }
  }, [questNum]);

  const nextPost = useCallback(
    (num: number) => {
      setWhichPost(num);
      getBoardData();
    },
    [whichPost, boardData],
  );

  const toDaychk = useCallback(() => {
    navigation.navigate('TodayChk');
  }, [navigation]);

  const toAllQuest = useCallback(() => {
    navigation.navigate('AllQuest');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.attendance}>
        <View style={styles.attendanceDetail_1}>
          <View style={styles.levelBox}>
            <Image source={levelImage} style={styles.levelImg} />
            <View style={styles.LeveltxtBox}>
              <Text style={styles.levelTxt}>{level}</Text>
            </View>
          </View>
        </View>
        <View style={styles.attendanceDetail_2}>
          <Text style={styles.txt}>연속 도전</Text>
          <Text style={styles.attendanceDetailTxt}>{seqCount}회</Text>
        </View>
        <View style={styles.attendanceDetail_2}>
          <Text style={styles.txt}>수행한 퀘스트</Text>
          <Text style={styles.attendanceDetailTxt}>{completedNum}회</Text>
        </View>
        <View style={styles.attendanceDetail_3}>
          <Text style={styles.txt}>포인트</Text>
          <Text style={styles.attendanceDetailTxt}>{point}p</Text>
        </View>
      </View>
      <View style={styles.quest}>
        {questSelected === 'F' ? (
          <View style={styles.questBody}>
            <Pressable
              style={styles.questBtn}
              onPress={() => {
                setQuestSelected('T');
                selectQuest(questNum * 3);
                console.log(questSelected);
              }}>
              <Text style={styles.questBtnTxt}>
                {allQuestData[questNum * 3].q_name}
              </Text>
            </Pressable>
            <Pressable
              style={styles.questBtn}
              onPress={() => {
                selectQuest(questNum * 3 + 1);
                setQuestSelected('T');
              }}>
              <Text style={styles.questBtnTxt}>
                {allQuestData[questNum * 3 + 1].q_name}
              </Text>
            </Pressable>
            <Pressable
              style={styles.questBtn}
              onPress={() => {
                selectQuest(questNum * 3 + 2);
                setQuestSelected('T');
              }}>
              <Text style={styles.questBtnTxt}>
                {allQuestData[questNum * 3 + 2].q_name}
              </Text>
            </Pressable>
            <Pressable style={styles.questRandomBtn} onPress={nextQuestList}>
              <Text style={styles.questBtnTxt}>추천 도전 새로고침</Text>
            </Pressable>
            <View style={styles.questFooter}>
              <Pressable onPress={toAllQuest}>
                <Text style={styles.questFooterTxt}>전체 도전 목록 보기</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.questBodyDecided}>
            <View style={styles.myQuest}>
              <Text style={styles.questNum}>
                {myQuest.questCategory} - {myQuest.questMidCategory}
              </Text>
              <Text style={styles.questName}>{myQuest.quest_name}</Text>
              <Text style={styles.howManyPeopleInQuest}>
                {myQuest.num_people}명이 이 도전에 참여중입니다
              </Text>
              <Pressable onPress={toDaychk} style={styles.submitQuestTodayBtn}>
                <Text style={styles.submitQuestTodayTxt}>도전 기록하기</Text>
              </Pressable>
            </View>
            <Pressable style={styles.reselect} onPress={resetQuest}>
              <Text style={styles.questBtnTxt}>도전 다시 선택하기</Text>
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.board}>
        <View style={styles.boardSearch}>
          <FontAwesomeIcon name="search" size={25} color="#B7CBB2" />
          <Pressable
            onPress={() =>
              navigation.navigate('SearchPostHome', {goBackToBoard: 'F'})
            }>
            <Text style={styles.searchTxt}>게시판 검색</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.boardBody}
          onPress={() =>
            navigation.navigate('PostDetail', {postID: boardData[0].incr})
          }>
          <View style={styles.boardHeader}>
            <View style={styles.boardProfile}>
              <Pressable style={styles.profile} />
              <View style={{flex: 5}}>
                <Text style={styles.boardProfileUsername} numberOfLines={1}>
                  {boardData[whichPost]?.user_name}
                </Text>
                <Text style={styles.boardProfileTitle} numberOfLines={2}>
                  {boardData[whichPost]?.title}
                </Text>
              </View>
            </View>
            <View style={styles.boardRecommend}>
              <Pressable onPress={() => console.log(allQuestData)}>
                <FontAwesomeIcon
                  name="thumbs-up"
                  size={39}
                  color={boardData[whichPost]?.myrec ? '#1F6733' : '#DAE2D8'}
                />
              </Pressable>
              <Text style={styles.boardRecommendTxt}>
                {boardData[whichPost]?.like}
              </Text>
            </View>
          </View>
          <Text style={styles.boardContentTxt} numberOfLines={3}>
            {boardData[whichPost]?.content}
          </Text>
        </Pressable>
        <View style={styles.boardFooter}>
          {boardData.length > 0 && (
            <Pressable
              onPress={() => {
                nextPost(0);
              }}
              style={
                whichPost === 0
                  ? styles.boardFooterBtnActive
                  : styles.boardFooterBtn
              }
            />
          )}
          {boardData.length > 1 && (
            <Pressable
              onPress={() => {
                nextPost(1);
              }}
              style={
                whichPost === 1
                  ? styles.boardFooterBtnActive
                  : styles.boardFooterBtn
              }
            />
          )}
          {boardData.length > 2 && (
            <Pressable
              onPress={() => {
                nextPost(2);
              }}
              style={
                whichPost === 2
                  ? styles.boardFooterBtnActive
                  : styles.boardFooterBtn
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Home;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  attendance: {
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
  },
  txt: {
    fontWeight: '400',
  },
  attendanceDetail_1: {
    flex: 1,
    borderRightWidth: 1,
    marginHorizontal: 2,
    borderColor: '#E7EBE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBox: {
    flexDirection: 'column',
    borderColor: '#B7CBB2',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    height: '140%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  levelImg: {
    flex: 3,
    width: 47,
  },
  LeveltxtBox: {
    flex: 1,
    backgroundColor: '#B7CBB2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  levelTxt: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  attendanceDetail_2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginHorizontal: 2,
    borderColor: '#E7EBE4',
  },
  attendanceDetail_3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    marginHorizontal: 2,
    borderColor: '#E7EBE4',
  },
  attendanceDetailTxt: {
    color: '#346627',
    fontSize: 30,
    fontWeight: 'bold',
  },
  quest: {
    flex: 15,
    backgroundColor: '#E4EAE3',
    marginBottom: 18,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 3,
    paddingHorizontal: 10,
  },
  questBody: {
    flex: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  questBodyDecided: {
    flex: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  myQuest: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 15,
    marginTop: 5,
    width: '100%',
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
    fontWeight: '800',
    textAlign: 'center',
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
  reselect: {
    flex: 4,
    marginTop: 12,
    marginBottom: 5,
    backgroundColor: '#B7CBB2',
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questBtn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questBtnTxt: {
    fontSize: 14,
    color: '#3D3C3C',
    fontWeight: 'bold',
  },
  questRandomBtn: {
    flex: 1,
    backgroundColor: '#B7CBB2',
    borderRadius: 30,
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questFooter: {
    flex: 1,
    // backgroundColor: '#F9FAF8',
    borderRadius: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questFooterTxt: {
    color: '#1F6733',
    fontSize: 11,
    fontWeight: '600',
  },
  board: {
    flex: 15,
    backgroundColor: '#E4EAE3',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  boardSearch: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: '#F9FAF8',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchTxt: {
    fontSize: 18,
    color: '#B7CBB2',
    marginLeft: 8,
    fontWeight: '600',
  },
  boardBody: {
    flex: 15,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 5,
  },
  boardProfile: {
    flexDirection: 'row',
    flex: 4,
    flexWrap: 'wrap',
  },
  profile: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    marginRight: 10,
  },
  boardProfileUsername: {
    fontSize: 12,
    color: '#5F5D5D',
  },
  boardProfileTitle: {
    fontSize: 17,
    color: '#3D3C3C',
    fontWeight: 'bold',
  },
  boardRecommend: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 3,
  },
  boardRecommendTxt: {
    color: '#B7CBB2',
    fontSize: 15,
  },
  boardContentTxt: {
    fontSize: 12,
    color: '#4C4D4C',
  },
  boardFooter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  boardFooterBtn: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#F9FAF8',
    marginHorizontal: 5,
  },
  boardFooterBtnActive: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#B7CBB2',
    marginHorizontal: 5,
  },
  modalBG: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    position: 'absolute',
    top: 100,
    right: 80,
    left: 80,
    bottom: 150,
    // paddingVertical: 15,
    backgroundColor: 'white',
    borderColor: '#B7CBB2',
    borderWidth: 1,
    // borderRadius: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBtn: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#B7CBB2',
    width: '100%',
    alignItems: 'center',
    // paddingVertical: 3,
    justifyContent: 'center',
  },
});

// // await AsyncStorage.removeItem('now');
// let temp = false;
// let keys = await AsyncStorage.getAllKeys();
// if (keys.includes('now')) {
//   await AsyncStorage.setItem('now', String(new Date()));
//   let check = new Date(String(new Date()));
//   let today = new Date();
//   console.log('check: ' + check)
//   console.log('today: ' + today)
//   temp = (check.getDate() == today.getDate());
// }
// console.log(temp);
// if (!temp)
//   const response = await axios.get(`${Config.API_URL}/quest/recommend/${userID}`);
//   setAllQuestData(response.data.recommend);
//   console.log(response.data.recommend);
//   storeData(JSON.stringify(response.data.recommend));
//   // setRecommendAgain(false);
// }
// else {
//   console.log('error')
//   let data = getQuestData(); // 가공 필요
//   console.log(data)
//   // setAllQuestData([data]);
// }
