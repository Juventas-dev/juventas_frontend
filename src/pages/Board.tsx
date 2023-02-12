import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, TextInput, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/BoardNavigation';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

type BoardScreenProps = NativeStackScreenProps<RootStackParamList, 'Board'>;
type ItemProps = {incr: number, c_id: number, title: string, like: number, comment: number};

function Board({navigation}: BoardScreenProps) {
  const toSearchPost = useCallback(() => {navigation.navigate('SearchPost')}, [navigation])
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation])
  const [DATA, setDATA] = useState<ItemProps[]>([]);
  
  useEffect(() => {
    const getBoardAndRefresh = async () => {
      try {
        const response = await axios.get(`${Config.API_URL}/board/post`);
        setDATA(response.data.post);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    getBoardAndRefresh();
  },[]);
  
  const Item = ({incr, c_id, title, like, comment}: ItemProps) => (
    <Pressable style={styles.posting} onPress={() => navigation.navigate('PostDetail', {postID: incr})}>
      <View style={styles.postContent}>
        <Text style={styles.postContentCategory} numberOfLines={1}>{c_id}</Text>
        <Text style={styles.postContentTitle} numberOfLines={2}>{title}</Text>
      </View>
      <View style={styles.postInfo}>
        <View style={styles.postInfoDetail}>
          <FontAwesomeIcon
              name="thumbs-up"
              size={30}
              color='#DAE2D8'
              // 내가 추천했을 경우 색을 다르게
            />
          <Text style={styles.postInfoTxt}>{like}</Text>
        </View>
        <View style={styles.postInfoDetail}>
        <FontAwesome5Icon
              name="comment-dots"
              size={30}
              color='#DAE2D8'
            />
          <Text style={styles.postInfoTxt}>{comment}</Text>
        </View>
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
              onFocus={toSearchPost}
              // ref={SearchRef}
              // onChangeText={onChangeSearch}
            />
          </View>
        </View>
      </View>
      <View style={styles.filtering}>
        <Pressable style={styles.category}>
          <Text style={styles.categoryTxt}>카테고리</Text>
          <FontAwesome5Icon
            name="caret-down"
            size={30}
            color='#DAE2D8'
            style={styles.categoryIcon}
          />
        </Pressable>
        <Pressable style={styles.category}>
          <Text style={styles.categoryTxt}>필터</Text>
          <FontAwesome5Icon
            name="caret-down"
            size={30}
            color='#DAE2D8'
            style={styles.categoryIcon}
          />
        </Pressable>
      </View>
      <FlatList
        data={DATA} // 여러 키가 있어서 오류가 남
        renderItem={({item}) => <Item title={item.title} incr={item.incr} c_id={item.c_id} like={item.like} comment={item.comment} />}
        keyExtractor={Item => String(Item.incr)} // incr을 무식하게 String으로 바꿔서 하는 게 맞나?
      />
      <Pressable style={styles.newPostBtn}>
        <FontAwesome5Icon 
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
  filtering:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  category: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  categoryTxt: {
    fontSize: 18,
    color: '#DAE2D8',
    marginLeft: 20
  },
  categoryIcon: {
    marginRight: 15
  },
  posting: {
    borderTopWidth: 1,
    borderTopColor: '#EBEFEA',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  postContent: {
    marginLeft: 20,
    justifyContent: 'center',
    width: '65%',
  },
  postContentCategory:{
    fontSize: 14,
    color: '#5F5D5D'
  },
  postContentTitle: {
    fontSize: 18,
    color: '#878787'
  },
  postInfo: {
    flexDirection: 'row',
    marginRight: 20
  },
  postInfoDetail: {
    marginLeft: 20,
    alignItems: 'center'
  },
  postInfoTxt: {
    fontSize: 11,
    color: '#B7CBB2'
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