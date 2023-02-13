import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, TextInput, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/BoardNavigation';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

// npm install react-native-select-dropdown
// 참고 https://www.npmjs.com/package/react-native-select-dropdown#onSelect
import SelectDropdown from 'react-native-select-dropdown';

type BoardScreenProps = NativeStackScreenProps<RootStackParamList, 'Board'>;
type ItemProps = {incr: number, c_id: number, title: string, like: number, comment: number};

function Board({navigation}: BoardScreenProps) {
  const toSearchPost = useCallback(() => {navigation.navigate('SearchPost')}, [navigation])
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation])
  const [DATA, setDATA] = useState<ItemProps[]>([]);
  const [bestPostDATA, setBestPostDATA] = useState<ItemProps[]>([]);
  const [bestPost, setBestPost] = useState(true);

  const [categorySelected, setCategorySelected] = useState(0);
  const [filterSelected, setFilterSelected] = useState(0);
  const categoryDATA = [
    '전체', '운동', '관계'
    // 카테고리 추가
  ]
  const filterDATA = [
    '전체', '노하우', 'QnA'
  ]

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filterPost = async () => {
      try {
        if (categorySelected) {
          if (filterSelected) {
            let temp = undefined;
            if (filterSelected == 1) {temp = `F`}
            else {temp = `T`}
            const response = await axios.get(`${Config.API_URL}/board/post?c_id=${categorySelected}&is_qna='${temp}'`);
            setDATA(response.data.post);
            setBestPost(false);
          }
          else {
            const response = await axios.get(`${Config.API_URL}/board/post?c_id=${categorySelected}`);
            setDATA(response.data.post);
            setBestPost(false);
          }
        }
        else {
          if (filterSelected) {
            let temp = undefined;
            if (filterSelected == 1) {temp = `F`}
            else {temp = `T`}
            const response = await axios.get(`${Config.API_URL}/board/post?is_qna='${temp}'`);
            setDATA(response.data.post);
            setBestPost(false);
          }
          else {
            const response = await axios.get(`${Config.API_URL}/board/post`);
            setDATA(response.data.post);
            setBestPost(true);
          }
        }
        
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    }
    filterPost();
  }, [categorySelected, filterSelected, refreshing]);
  
  useEffect(() => {
    const getBoardAndRefresh = async () => {
      try {
        const response = await axios.get(`${Config.API_URL}/board/post`);
        setDATA(response.data.post);
        console.log(response.data.bestPost)
        setBestPostDATA(response.data.bestPost);
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

  

  const FlatListHeader = () => {
    if (bestPost) { return <View>
      {bestPostDATA.length > 0 && <Pressable style={styles.posting} onPress={() => navigation.navigate('PostDetail', {postID: bestPostDATA[0].incr})}>
        <View style={styles.postContent}>
          <Text style={styles.postContentCategory} numberOfLines={1}>{bestPostDATA[0].c_id}</Text>
          <Text style={styles.postContentTitle} numberOfLines={2}>{bestPostDATA[0].title}</Text>
        </View>
        <View style={styles.postInfo}>
          <View style={styles.postInfoDetail}>
            <FontAwesomeIcon
              name="thumbs-up"
              size={30}
              color='#DAE2D8'
              // 내가 추천했을 경우 색을 다르게
            />
            <Text style={styles.postInfoTxt}>{bestPostDATA[0].like}</Text>
          </View>
          <View style={styles.postInfoDetail}>
            <FontAwesome5Icon
              name="comment-dots"
              size={30}
              color='#DAE2D8'
            />
            <Text style={styles.postInfoTxt}>{bestPostDATA[0].comment}</Text>
          </View>
        </View>
      </Pressable>}
      {bestPostDATA.length > 1 && <Pressable style={styles.posting} onPress={() => navigation.navigate('PostDetail', {postID: bestPostDATA[1].incr})}>
        <View style={styles.postContent}>
          <Text style={styles.postContentCategory} numberOfLines={1}>{bestPostDATA[1].c_id}</Text>
          <Text style={styles.postContentTitle} numberOfLines={2}>{bestPostDATA[1].title}</Text>
        </View>
        <View style={styles.postInfo}>
          <View style={styles.postInfoDetail}>
            <FontAwesomeIcon
              name="thumbs-up"
              size={30}
              color='#DAE2D8'
              // 내가 추천했을 경우 색을 다르게
            />
            <Text style={styles.postInfoTxt}>{bestPostDATA[1].like}</Text>
          </View>
          <View style={styles.postInfoDetail}>
            <FontAwesome5Icon
              name="comment-dots"
              size={30}
              color='#DAE2D8'
            />
            <Text style={styles.postInfoTxt}>{bestPostDATA[1].comment}</Text>
          </View>
        </View>
      </Pressable>}
      {bestPostDATA.length > 2 && <Pressable style={styles.posting} onPress={() => navigation.navigate('PostDetail', {postID: bestPostDATA[2].incr})}>
        <View style={styles.postContent}>
          <Text style={styles.postContentCategory} numberOfLines={1}>{bestPostDATA[2].c_id}</Text>
          <Text style={styles.postContentTitle} numberOfLines={2}>{bestPostDATA[2].title}</Text>
        </View>
        <View style={styles.postInfo}>
          <View style={styles.postInfoDetail}>
            <FontAwesomeIcon
              name="thumbs-up"
              size={30}
              color='#DAE2D8'
              // 내가 추천했을 경우 색을 다르게
            />
            <Text style={styles.postInfoTxt}>{bestPostDATA[2].like}</Text>
          </View>
          <View style={styles.postInfoDetail}>
            <FontAwesome5Icon
              name="comment-dots"
              size={30}
              color='#DAE2D8'
            />
            <Text style={styles.postInfoTxt}>{bestPostDATA[2].comment}</Text>
          </View>
        </View>
      </Pressable>}
    </View>; }
    else { return <View />; }
  }
  
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
            />
          </View>
        </View>
      </View>
      <View style={styles.filtering}>
        <SelectDropdown 
          data={categoryDATA}
          onSelect={(selectedItem, index) => {setCategorySelected(index)}}
          defaultButtonText="카테고리"
          defaultValue={0}
          buttonTextAfterSelection={(selectedItem, index) => {
            switch (selectedItem) {
              case '전체': return '카테고리';
            }
            return selectedItem;
          }}
          buttonStyle={styles.category}
          buttonTextStyle={styles.categoryTxt}
          renderDropdownIcon={() => { return <FontAwesome5Icon
            name="caret-down"
            size={30}
            color='#DAE2D8'
            style={styles.categoryIcon}
          />}}
          dropdownOverlayColor="transparent"
          rowStyle={styles.categoryRow}
        />
        <SelectDropdown 
          data={filterDATA}
          onSelect={(selectedItem, index) => {setFilterSelected(index)}}
          defaultButtonText="필터"
          defaultValue={0}
          buttonTextAfterSelection={(selectedItem, index) => {
            switch (selectedItem) {
              case '전체': return '필터';
            }
            return selectedItem;
          }}
          buttonStyle={styles.category}
          buttonTextStyle={styles.categoryTxt}
          renderDropdownIcon={() => { return <FontAwesome5Icon
            name="caret-down"
            size={30}
            color='#DAE2D8'
            style={styles.categoryIcon}
          />}}
          dropdownOverlayColor="transparent"
          rowStyle={styles.categoryRow}
        />
      </View>
      
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} incr={item.incr} c_id={item.c_id} like={item.like} comment={item.comment} />}
        keyExtractor={Item => String(Item.incr)} // incr을 무식하게 String으로 바꿔서 하는 게 맞나?
        ListHeaderComponent={FlatListHeader}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    flex: 1,
    // paddingBottom: 100
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
    justifyContent: 'space-around',
    paddingHorizontal: 15
  },
  category: {
    backgroundColor: 'white', 
    width: '40%',
  },
  categoryTxt: {
    fontSize: 18,
    color: '#DAE2D8',
    marginLeft: 20
  },
  categoryIcon: {
    marginRight: 15
  },
  categoryRow: {
    backgroundColor: 'white'
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

