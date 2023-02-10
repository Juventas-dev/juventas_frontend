import React, { useCallback, useState, useRef } from 'react';
import {View, Text, FlatList, Pressable, StyleSheet, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/BoardNavigation';

const DATA = [
  {
    id: '1234',
    c_id: '0',
    q_id: '0',
    Is_qna: 'F',
    title: '줄넘기 하는 법',
    content: '줄넘기는 이렇게!',
    img_path: '',
  },
  {
    id: '12345',
    c_id: '1',
    q_id: '0',
    Is_qna: 'F',
    title: '서핑보드 중심 잡기',
    content: '어려워요',
    img_path: '',
  },
];

type BoardScreenProps = NativeStackScreenProps<RootStackParamList, 'Board'>;
type ItemProps = {title: string, c_id:string, id: string};

function Board({navigation}: BoardScreenProps) {
  const SearchRef = useRef<TextInput | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const onFocusSearch = useCallback(() => {setSearchFocused(true);}, []);
  const onPressCancel = useCallback(() => {
    setSearchFocused(false);
    SearchRef.current?.clear();
    SearchRef.current?.blur();
  }, []);
  const onChangeSearch = useCallback((text: string) => {
    // 검색
  }, []);
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation])
  const toPostDetail = useCallback(() => {navigation.navigate('PostDetail')}, [navigation]);

  const Item = ({title, c_id, id}: ItemProps) => (
    <Pressable style={styles.posting} onPress={toPostDetail}>
      <View style={styles.postProfile}>
        <Text>{id}</Text>
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postContentCategory}>{c_id}</Text>
        <Text style={styles.postContentTitle}>{title}</Text>
      </View>
    </Pressable>
  );


  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.header}>
        <View><Text>게시판</Text></View>
        <View style={styles.headerSearchingArea}>
          <View style={styles.headerSearch}>
            <FontAwesomeIcon
              name="search"
              size={22}
              color='#DAE2D8'
              style={styles.headerSearchIcon}
            />
            <TextInput 
              style={styles.headerSearchInput} 
              placeholder="노하우 검색"
              placeholderTextColor={'#DAE2D8'}
              onFocus={onFocusSearch}
              ref={SearchRef}
              onChangeText={onChangeSearch}
            />
          </View>
          <Pressable 
            style={
              searchFocused
              ? styles.headerSearchCancelBtn
              : styles.headerSearchCancelBtnInactive
            }
            onPress={onPressCancel}>
            <Text 
              style={
                searchFocused
              ? styles.headerSearchCancelBtnText
              : styles.headerSearchCancelBtnTextInactive
              }>취소</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.boardType}>
        <Pressable><Text>전체</Text></Pressable>
        <Pressable><Text>노하우</Text></Pressable>
        <Pressable><Text>질문</Text></Pressable>
        
      </View>
      <View style={styles.category}>
        <Pressable style={styles.categoryBtn}><Text style={styles.categoryTxt}>전체</Text></Pressable>
        <Pressable style={styles.categoryBtn}><Text style={styles.categoryTxt}>건강</Text></Pressable>
        <Pressable style={styles.categoryBtn}><Text style={styles.categoryTxt}>여가</Text></Pressable>
        <Pressable style={styles.categoryBtn}><Text style={styles.categoryTxt}>학습</Text></Pressable>
        <Pressable style={styles.categoryBtn}><Text style={styles.categoryTxt}>관계</Text></Pressable>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} c_id={item.c_id} id={item.id} />}
        keyExtractor={Item => Item.id}
      />
      <Pressable style={styles.newPostBtn}>
        <FontAwesomeIcon5 
          name="pen-nib"
          size={40}
          color='white'
          onPress={toNewPost}
        />
      </Pressable>
    </SafeAreaView>
  );
}
export default Board;

const styles = StyleSheet.create({
  entire:{
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    backgroundColor: '#F9FAF8'
  },
  headerSearchingArea: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginVertical: 15,
  },
  headerSearch: {
    flexDirection: 'row',
    backgroundColor: '#EBEFEA',
    borderRadius: 10,
    alignItems: 'center',
    height: 40,
    flex: 4,
  },
  headerSearchIcon: {
    marginLeft: 15
  },
  headerSearchInput: {
    backgroundColor: 'transparent',
    color: '#1F6733',
    fontSize: 18,
    padding: 0,
    width: '88%',
    paddingLeft: 10
  },
  headerSearchCancelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerSearchCancelBtnInactive: {
    height: 0,
    weight: 0,
  },
  headerSearchCancelBtnText: {
    color: '#1F6733',
    fontSize: 18
  },
  headerSearchCancelBtnTextInactive: {
    height: 0,
    width: 0
  },
  boardType:{
    flexDirection: 'row'
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40
  },
  categoryBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryTxt: {
    fontSize: 18,
    color: '#DAE2D8'
  },
  posting: {
    borderTopWidth: 1,
    borderTopColor: '#EBEFEA',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center'
  },
  postProfile: {
    width: 60,
    height: 60,
    backgroundColor: 'pink',
    borderRadius: 30,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  postContent: {
    marginLeft: 10,
    justifyContent: 'center'
  },
  postContentCategory:{
    fontSize: 14,
    color: '#5F5D5D'
  },
  postContentTitle: {
    fontSize: 18,
    color: '#878787'
  },
  newPostBtn: {
    backgroundColor: '#1F6733',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});