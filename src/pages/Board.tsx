import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BoardStackParamList } from '../navigations/BoardNavigation';
import { useRoute } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import SelectDropdown from 'react-native-select-dropdown';
import PostItem from '../components/PostItem';

type BoardScreenProps = NativeStackScreenProps<BoardStackParamList, 'Board'>;
type ItemProps = {
  incr: number;
  c_id: number;
  title: string;
  like: number;
  comment: number;
};

const FlatListHeader = (bestPostDATA: ItemProps[]) => (
  <View>
    {bestPostDATA.map(item => (
      <PostItem item={item} />
    ))}
  </View>
);

function Board({navigation}: BoardScreenProps) {
  const userID = useSelector((state: RootState) => state.user.id);
  const toSearchPost = useCallback(() => {
    navigation.navigate('SearchPost', {goBackToBoard: 'T'});
  }, [navigation]);
  const toNewPost = useCallback(() => {
    navigation.navigate('NewPost');
  }, [navigation]);
  const [DATA, setDATA] = useState<ItemProps[]>([]);
  const [bestPostDATA, setBestPostDATA] = useState<ItemProps[]>([]);

  const [categorySelected, setCategorySelected] = useState(0);
  const [filterSelected, setFilterSelected] = useState(0);
  const categoryDATA = ['전체', '건강', '여가', '학습', '관계'];
  const filterDATA = ['전체', '노하우', 'QnA'];

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
            let temp;
            if (filterSelected === 1) {
              temp = 'F';
            } else {
              temp = 'T';
            }
            const response = await axios.get(
              `${Config.API_URL}/board/post?c_id=${
                categorySelected - 1
              }&is_qna='${temp}'&id='${userID}'`,
            );
            setDATA(response.data.post);
            setBestPostDATA([]);
          } else {
            const response = await axios.get(
              `${Config.API_URL}/board/post?c_id=${
                categorySelected - 1
              }&id='${userID}'`,
            );
            setDATA(response.data.post);
            setBestPostDATA([]);
          }
        } else {
          if (filterSelected) {
            let temp;
            if (filterSelected === 1) {
              temp = 'F';
            } else {
              temp = 'T';
            }
            const response = await axios.get(
              `${Config.API_URL}/board/post?is_qna='${temp}'&id='${userID}'`,
            );
            setDATA(response.data.post);
            setBestPostDATA([]);
          } else {
            const response = await axios.get(
              `${Config.API_URL}/board/post?id='${userID}'`,
            );
            setDATA(response.data.post);
            setBestPostDATA(response.data.bestPost);
          }
        }
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
        if (errorResponse) {
          return Alert.alert('알림', errorResponse.data?.message);
        }
      }
    };
    filterPost();
  }, [categorySelected, filterSelected, refreshing, userID]);

  useEffect(() => {
    const getBoardAndRefresh = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/board/post?id='${userID}'`,
        );
        setDATA(response.data.post);
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
  }, []);

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.header}>
        <View style={styles.headerSearchingArea}>
          <View style={styles.headerSearch}>
            <FontAwesomeIcon
              name="search"
              size={22}
              color="#DAE2D8"
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
          onSelect={(_selectedItem, index) => {
            setCategorySelected(index);
          }}
          defaultButtonText="카테고리"
          defaultValue={0}
          buttonTextAfterSelection={(selectedItem, _index) => {
            switch (selectedItem) {
              case '전체':
                return '카테고리';
            }
            return selectedItem;
          }}
          buttonStyle={styles.category}
          buttonTextStyle={styles.categoryTxt}
          renderDropdownIcon={() => {
            return (
              <FontAwesome5Icon
                name="caret-down"
                size={30}
                color="#DAE2D8"
                style={styles.categoryIcon}
              />
            );
          }}
          dropdownOverlayColor="transparent"
          rowStyle={styles.categoryRow}
        />
        <SelectDropdown
          data={filterDATA}
          onSelect={(_selectedItem, index) => {
            setFilterSelected(index);
          }}
          defaultButtonText="필터"
          defaultValue={0}
          buttonTextAfterSelection={(selectedItem, _index) => {
            switch (selectedItem) {
              case '전체':
                return '필터';
            }
            return selectedItem;
          }}
          buttonStyle={styles.category}
          buttonTextStyle={styles.categoryTxt}
          renderDropdownIcon={() => {
            return (
              <FontAwesome5Icon
                name="caret-down"
                size={30}
                color="#DAE2D8"
                style={styles.categoryIcon}
              />
            );
          }}
          dropdownOverlayColor="transparent"
          rowStyle={styles.categoryRow}
        />
      </View>

      <FlatList
        data={DATA}
        renderItem={({item}) => <PostItem item={item} />}
        keyExtractor={Item => String(Item.incr)} // incr을 무식하게 String으로 바꿔서 하는 게 맞나?
        ListHeaderComponent={FlatListHeader(bestPostDATA)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Pressable style={styles.newPostBtn}>
        <FontAwesome5Icon
          name="pen-nib"
          size={40}
          color="white"
          onPress={toNewPost}
        />
      </Pressable>
    </SafeAreaView>
  );
}
export default Board;

const styles = StyleSheet.create({
  entire: {
    backgroundColor: 'white',
    flex: 1,
    // paddingBottom: 100
  },
  header: {
    backgroundColor: '#F9FAF8',
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
    marginLeft: 15,
  },
  headerSearchInput: {
    backgroundColor: 'transparent',
    color: '#1F6733',
    fontSize: 18,
    padding: 0,
    width: '88%',
    paddingLeft: 10,
  },
  filtering: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  category: {
    backgroundColor: 'white',
    width: '40%',
  },
  categoryTxt: {
    fontSize: 18,
    color: '#DAE2D8',
    marginLeft: 20,
  },
  categoryIcon: {
    marginRight: 15,
  },
  categoryRow: {
    backgroundColor: 'white',
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
    right: 20,
  },
});
