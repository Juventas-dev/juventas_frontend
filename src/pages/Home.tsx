import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {HomeStackParamList} from '../navigations/HomeNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function Home({navigation}: HomeScreenProps) {
  const [myPostRecommend, setMyPostRecommend] = useState(false);
  const [questDecided, setQuestDecided] = useState(false);
  const [firstSetting, notFirstSetting] = useState(true);
  // 0세트 1세트 2세트
  const [questNum, setQuestNum] = useState(0);
  const [questData, setQuestData] = useState([
    {incr: 1, q_name: 'q_name'},
    {incr: 2, q_name: 'q_name'},
    {incr: 3, q_name: 'q_name'},
    {incr: 4, q_name: 'q_name'},
    {incr: 5, q_name: 'q_name'},
    {incr: 6, q_name: 'q_name'},
    {incr: 7, q_name: 'q_name'},
    {incr: 8, q_name: 'q_name'},
    {incr: 9, q_name: 'q_name'},
  ]);
  const [myQuest, setMyQuest] = useState({
    quest_name: 'quest_name',
    quest_id: 1,
    num_people: 1,
  });
  const [boardData, setBoardData] = useState([
    {incr: 1, c_id: 0, title: 'title', like: 0, comment: 0},
  ]);
  const [boardContent, setBoardContent] = useState({
    title: 'title',
    content: 'content',
    userID: 'userID',
  });
  const [whichPost, setWhichPost] = useState(0);
  const [modal, showModal] = useState(false);

  const [questSelected, setQuestSelected] = useState('T');

  const userID = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const setHomeQuestDecided = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/quest/questselected/${userID}`,
        );
        console.log(response.data);
        setQuestSelected(response.data.is_selected);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
      // console.log('setHomeQuestDecided called')
    };

    setHomeQuestDecided();
    whichScreen();
    getBoardData();
  }, [questSelected, whichPost]);

  useEffect(() => {
    console.log(boardData);
    console.log('lookatThis');
  }, [boardData]);

  const whichScreen = useCallback(() => {
    // console.log(questSelected);
    if (questSelected === 'F') {
      setQuestDecided(false);
      setHome();
    } else {
      setQuestDecided(true);
      setWithHowMany();
    }
    // console.log('whichScreen called')
  }, [questSelected]);

  const nextQuestList = useCallback(() => {
    if (questNum === 2) {
      setQuestNum(0);
    } else {
      setQuestNum(questNum + 1);
    }
  }, [questNum]);

  const setHome = useCallback(() => {
    const setHomeWait = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/quest/recommend/${userID}`,
        );
        console.log(response.data.recommend);
        setQuestData(response.data.recommend);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    setHomeWait();
  }, [questData]);

  const setWithHowMany = useCallback(() => {
    const getWithHowMany = async () => {
      console.log('abcd');
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
    getWithHowMany();
  }, []);

  const getBoardData = useCallback(() => {
    const getBoardDataWait = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/board/post?id='${userID}'`,
        );
        // console.log('herererererere');
        setBoardData(response.data.bestPost);
        // console.log(response.data.bestPost);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
      // console.log(boardData);
      getBoardContent(whichPost); // 얘가 원래 133번째줄에 있었음
    };
    getBoardDataWait();
    // console.log('getBoardData called')
    // console.log(whichPost);
    // console.log('whichPost')
  }, [boardData]);

  const getBoardContent = useCallback(
    (num: number) => {
      const getBoardContentWait = async () => {
        try {
          // console.log('what data');
          // console.log(boardData[num])
          const response = await axios.get(
            `${Config.API_URL}/board/post/${boardData[num].incr}?id='${userID}'`,
          );
          setBoardContent({
            title: response.data.post[whichPost].title,
            content: response.data.post[whichPost].content,
            userID: response.data.post[whichPost].user_name,
          });
          // console.log(response.data)
        } catch (error) {
          const errorResponse = (error as AxiosError<{message: string}>)
            .response;
          console.error(errorResponse);
          if (errorResponse) {
            return Alert.alert('알림', errorResponse.data?.message);
          }
        }
      };
      console.log('getBoardContent called');
      getBoardContentWait();
    },
    [boardContent],
  );

  const selectMyQuest = useCallback(
    (num: number) => {
      const postMyQuest = async () => {
        try {
          if (firstSetting) {
            const response = await axios.post(
              `${Config.API_URL}/quest/userquest`,
              {
                id: userID,
                q_id: questData[num].incr,
              },
            );
            console.log(response.data);
          } else {
            const response = await axios.patch(
              `${Config.API_URL}/quest/updatequest`,
              {
                id: userID,
                q_id: questData[num].incr,
              },
            );
            console.log(response.data);
          }
        } catch (error) {
          const response = await axios.get(
            `${Config.API_URL}/quest/recommend/${userID}`,
          );
          console.log(response.data);
        }
      };

      postMyQuest();
      setQuestDecided(true);
      // setMyQuestNum(num);
      // selectMyQuest()
      setWithHowMany();
    },
    [questData, firstSetting, questDecided],
  );

  const resetMyQuest = useCallback(() => {
    const resetMyQuestWait = async () => {
      try {
        const response = await axios.patch(
          `${Config.API_URL}/quest/questreselect`,
          {
            id: userID,
          },
        );
        console.log(response.data);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    setQuestDecided(false);
    notFirstSetting(false);
    resetMyQuestWait();
    setHome();
  }, []);

  const nextPost = useCallback(
    (num: number) => {
      setWhichPost(num);
      getBoardData();
    },
    [whichPost],
  );

  const toDaychk = useCallback(() => {
    navigation.navigate('TodayChk');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.attendance}>
        <View style={styles.attendanceDetail}>
          <Text>연속으로 출석했어요</Text>
          <Text style={styles.attendanceDetailTxt}>6회</Text>
        </View>
        <View style={styles.attendanceDetail}>
          <Text>이번달 이만큼 출석했어요</Text>
          <Text style={styles.attendanceDetailTxt}>14회</Text>
        </View>
      </View>
      <View style={styles.quest}>
        {!questDecided ? (
          <View style={styles.questBody}>
            <Pressable
              style={styles.questBtn}
              onPress={() => selectMyQuest(questNum * 3)}>
              <Text style={styles.questBtnTxt}>
                {questData[questNum * 3].q_name}
              </Text>
            </Pressable>
            <Pressable
              style={styles.questBtn}
              onPress={() => selectMyQuest(questNum * 3 + 1)}>
              <Text style={styles.questBtnTxt}>
                {questData[questNum * 3 + 1].q_name}
              </Text>
            </Pressable>
            <Pressable
              style={styles.questBtn}
              onPress={() => selectMyQuest(questNum * 3 + 2)}>
              <Text style={styles.questBtnTxt}>
                {questData[questNum * 3 + 2].q_name}
              </Text>
            </Pressable>
            <Pressable style={styles.questRandomBtn} onPress={nextQuestList}>
              <Text style={styles.questBtnTxt}>랜덤</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.questBodyDecided}>
            <View style={styles.myQuest}>
              <Text style={styles.questNum}>{myQuest.quest_id}</Text>
              <Text style={styles.questName}>{myQuest.quest_name}</Text>
              <Text style={styles.howManyPeopleInQuest}>
                {myQuest.num_people}명이 이 퀘스트에 참여중입니다
              </Text>
              <Pressable onPress={toDaychk} style={styles.submitQuestTodayBtn}>
                <Text style={styles.submitQuestTodayTxt}>오늘의 인증</Text>
              </Pressable>
            </View>
            <Pressable style={styles.reselect} onPress={resetMyQuest}>
              <Text>다시 선택하기</Text>
            </Pressable>
          </View>
        )}
        {!questDecided && (
          <View style={styles.questFooter}>
            <Pressable>
              <Text
                style={styles.questFooterTxt}
                onPress={() => showModal(true)}>
                전체 퀘스트 보기
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.board}>
        <View style={styles.boardSearch}>
          <FontAwesomeIcon name="search" size={25} color="#DAE2D8" />
          {/*  onPress={() => navigation.navigate('SearchPost', {goBackToBoard: 'F'})} */}
          <Pressable onPress={() => navigation.navigate('SearchPostHome')}>
            <Text style={styles.searchTxt}>게시판 검색</Text>
          </Pressable>
        </View>
        {/*  onPress={() => navigation.navigate('PostDetail', {postID: boradData[0].incr})} */}
        <Pressable style={styles.boardBody}>
          <View style={styles.boardHeader}>
            <View style={styles.boardProfile}>
              <Pressable style={styles.profile} />
              <View>
                <Text style={styles.boardProfileUsername} numberOfLines={1}>
                  {boardContent.userID}
                </Text>
                <Text style={styles.boardProfileTitle} numberOfLines={1}>
                  {boardData[whichPost].title}
                </Text>
              </View>
            </View>
            <View style={styles.boardRecommend}>
              <Pressable onPress={() => console.log(questData)}>
                <FontAwesomeIcon
                  name="thumbs-up"
                  size={39}
                  color={myPostRecommend ? '#1F6733' : '#DAE2D8'}
                />
              </Pressable>
              <Text style={styles.boardRecommendTxt}>
                {boardData[whichPost].like}
              </Text>
            </View>
          </View>
          <Text style={styles.boardContentTxt} numberOfLines={3}>
            {boardContent.content}
          </Text>
        </Pressable>
        <View style={styles.boardFooter}>
          {boardData.length > 0 && (
            <Pressable
              onPress={() => {
                nextPost(0);
              }}
              style={styles.boardFooterBtnActive}
            />
          )}
          {boardData.length > 1 && (
            <Pressable
              onPress={() => {
                nextPost(1);
              }}
              style={styles.boardFooterBtn}
            />
          )}
          {boardData.length > 2 && (
            <Pressable
              onPress={() => {
                nextPost(2);
              }}
              style={styles.boardFooterBtn}
            />
          )}
        </View>
      </View>
      {modal && (
        <Pressable style={styles.modalBG} onPress={() => showModal(false)}>
          <View style={styles.modal}>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(0);
                showModal(false);
              }}>
              <Text>{questData[0].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(1);
                showModal(false);
              }}>
              <Text>{questData[1].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(2);
                showModal(false);
              }}>
              <Text>{questData[2].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(3);
                showModal(false);
              }}>
              <Text>{questData[3].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(4);
                showModal(false);
              }}>
              <Text>{questData[4].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(5);
                showModal(false);
              }}>
              <Text>{questData[5].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(6);
                showModal(false);
              }}>
              <Text>{questData[6].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(7);
                showModal(false);
              }}>
              <Text>{questData[7].q_name}</Text>
            </Pressable>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                selectMyQuest(8);
                showModal(false);
              }}>
              <Text>{questData[8].q_name}</Text>
            </Pressable>
          </View>
        </Pressable>
      )}
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
  attendanceDetail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceDetailTxt: {
    color: '#1F6733',
    fontSize: 30,
  },
  quest: {
    flex: 15,
    backgroundColor: '#EBEFEA',
    marginBottom: 18,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 3,
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
    fontSize: 15,
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
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  questFooterTxt: {
    color: '#1F6733',
    fontSize: 11,
  },
  board: {
    flex: 15,
    backgroundColor: '#EBEFEA',
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
    color: '#DAE2D8',
    marginLeft: 8,
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
    width: '82%',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    marginRight: 10,
  },
  boardProfileUsername: {
    fontSize: 12,
  },
  boardProfileTitle: {
    fontSize: 17,
  },
  boardRecommend: {
    width: '18%',
    alignItems: 'center',
    marginLeft: 3,
  },
  boardRecommendTxt: {
    color: '#B7CBB2',
    fontSize: 15,
  },
  boardContentTxt: {
    fontSize: 12,
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
