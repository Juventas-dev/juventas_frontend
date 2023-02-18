import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { ProgressViewIOSBase } from 'react-native/Libraries/Components/ProgressViewIOS/ProgressViewIOS';


function Home() {
  const [myPostRecommend, setMyPostRecommend] = useState(false);
  const [questDecided, setQuestDecided] = useState(false);
  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.attendance}>
        <View style={styles.attendanceDetail}>
          <Text>연속으로 출석했어요</Text>
          <Text style={styles.attendanceDetailTxt}>6회</Text>
        </View>
        <View style={styles.attendanceDetail}>
          <Text>이번달 이만큼 출석했어요</Text>
          <Text style={styles.attendanceDetailTxt}>40%</Text>
        </View>
      </View>
      <View style={styles.quest}>
        { !questDecided
        ? (<View style={styles.questBody}>
          <Pressable style={styles.questBtn}>
            <Text style={styles.questBtnTxt}>크리스마스 연말 음식 만들기</Text>
          </Pressable>
          <Pressable style={styles.questBtn}>
            <Text style={styles.questBtnTxt}>피아노 바이엘 3권 독학하기</Text>
          </Pressable>
          <Pressable style={styles.questBtn}>
            <Text style={styles.questBtnTxt}>배영 마스터하기</Text>
          </Pressable>
          <Pressable style={styles.questRandomBtn}>
            <Text style={styles.questBtnTxt}>랜덤</Text>
          </Pressable>
        </View>)
        : (<View style={styles.questBodyDecided}>
          <View style={styles.myQuest}>
            <Text style={styles.questNum}>퀘스트 번호 3</Text>
            <Text style={styles.questName}>크리스마스 연말 음식 만들기</Text>
            <Text style={styles.howManyPeopleInQuest}>136명이 이 퀘스트에 참여중입니다</Text>
            <Pressable style={styles.submitQuestTodayBtn}>
              <Text style={styles.submitQuestTodayTxt}>오늘의 인증</Text>
            </Pressable>
          </View>
          <Pressable style={styles.reselect}><Text>다시 선택하기</Text></Pressable>
          </View>)}
        <View style={styles.questFooter}>
          <Pressable>
            <Text style={styles.questFooterTxt}>전체 퀘스트 보기</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.board}>
        <View style={styles.boardSearch}>
          <FontAwesomeIcon
						name="search"
						size={28}
						color='#DAE2D8'
						// style={styles.headerSearchIcon}
					/>
          <Pressable>
            <Text style={styles.searchTxt}>게시판 검색</Text>
          </Pressable>
        </View>
        <Pressable style={styles.boardBody}>
          <View style={styles.boardHeader}>
            <View style={styles.boardProfile}>
              <Pressable style={styles.profile}></Pressable>
              <View>
                <Text style={styles.boardProfileUsername} numberOfLines={1}>동그란포도</Text>
                <Text style={styles.boardProfileTitle} numberOfLines={1}>바이올린 비브라토 연습하기</Text>
              </View>
            </View>
            <View style={styles.boardRecommend}>
              <Pressable>
                <FontAwesomeIcon
                  name="thumbs-up"
                  size={39}
                  color={myPostRecommend ? '#1F6733' : '#DAE2D8'}
						    />
              </Pressable>
              <Text style={styles.boardRecommendTxt}>41</Text>
            </View>
          </View>
          <ScrollView>
            <Text style={styles.boardContentTxt} numberOfLines={4}>안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요안녕하세요 동그란포도예요</Text>
          </ScrollView>
        </Pressable>
        <View style={styles.boardFooter}>
          <Pressable style={styles.boardFooterBtn}></Pressable>
          <Pressable style={styles.boardFooterBtn}></Pressable>
          <Pressable style={styles.boardFooterBtn}></Pressable>
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
    marginTop: 20
  },
  attendanceDetail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceDetailTxt: {
    color: '#1F6733',
    fontSize: 30
  },
  quest: {
    flex: 15,
    backgroundColor: '#EBEFEA',
    marginBottom: 18,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 3
  },
  questBody: {
    flex: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%'
  },
  questBodyDecided: {
    flex: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%'
  },
  myQuest: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 15,
    marginTop: 5,
    width: '100%'
  },
  questNum: {
    color: '#1F6733',
    fontSize: 12,
    marginBottom: 2
  },
  questName: {
    color: 'black',
    fontSize: 24,
    marginBottom: 5
  },
  howManyPeopleInQuest: {
    color: '#8D8D8D',
    fontSize: 12,
    marginBottom: 8
  },
  submitQuestTodayBtn: {
    backgroundColor: '#1F6733',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 35
  },
  submitQuestTodayTxt: {
    color: 'white',
    fontSize: 14
  },
  reselect: {
    flex: 4,
    marginTop: 12,
    marginBottom: 5,
    backgroundColor: '#B7CBB2',
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questBtn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  questBtnTxt: {
    fontSize: 15
  },
  questRandomBtn: {
    flex: 1,
    backgroundColor: '#B7CBB2',
    borderRadius: 30,
    marginVertical: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  questFooter: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-end'
  },
  questFooterTxt: {
    color: '#1F6733',
    fontSize: 11
  },
  board: {
    flex: 15,
    backgroundColor: '#EBEFEA',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  boardSearch: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: '#F9FAF8',
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10
  },
  searchTxt: {
    fontSize: 18,
    color: '#DAE2D8',
    marginLeft: 8
  },
  boardBody: {
    flex: 15,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 8
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  boardProfile: {
    flexDirection: 'row',
    width: '82%'
  },
  profile:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    marginRight: 10
  },
  boardProfileUsername: {
    fontSize: 12
  },
  boardProfileTitle: {
    fontSize: 17
  },
  boardRecommend: {
    width: '18%',
    alignItems: 'center',
    marginLeft: 3
  },
  boardRecommendTxt: {
    color: '#B7CBB2',
    fontSize: 15
  },
  boardContentTxt: {
    fontSize: 12
  },
  boardFooter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  boardFooterBtn: {
     width: 13,
     height: 13,
     borderRadius: 7,
     backgroundColor: '#F9FAF8',
     marginHorizontal: 5
  },
  boardFooterBtnActive: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#B7CBB2',
    marginHorizontal: 5
 },


});