import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuestStackParamList} from '../navigations/AllQuestNavigation';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetCategory from './SetCategory';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {compose} from '@reduxjs/toolkit';
import {useNavigationBuilder} from '@react-navigation/native';

type QuestScreenProps = NativeStackScreenProps<
  QuestStackParamList,
  'QuestList'
>;

const QuestList = ({navigation}: QuestScreenProps) => {
  const [quest, setQuest] = useState([{incr: 0, q_name: ''}]);
  const [categoryName, setCategoryNmae] = useState('');
  const [category, setCategory] = useState(0);

  const userID = useSelector((state: RootState) => state.user.id);

  const saveSelect = useCallback(() => {
    AsyncStorage.setItem('select', 'T', () => {
      console.log('저장완료');
    });
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const Category = await AsyncStorage.getItem('category');
      console.log(Category);
      if (Category) {
        setCategoryNmae(Category);
        if (Category === '건강') {
          setCategory(0);
        } else if (Category === '여가') {
          setCategory(1);
        } else if (Category === '학습') {
          setCategory(2);
        } else if (Category === '관계') {
          setCategory(3);
        } else {
          setCategory(4);
        }
      }
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getQuest = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/quest/wholequest/${category}`,
        );
        setQuest(response.data.quest);
        console.log(quest);
      } catch (error) {
        const errorResponse = (error as AxiosError<{message: string}>).response;
        console.error(errorResponse);
      }
    };
    getQuest();
  }, [category]);

  // const selectQuest = useCallback((num:number) => {
  //   AsyncStorage.setItem('questAgain', num.toString(), () => {
  //     console.log('change quest');
  //   });
  // }, []);

  const selectQuest = useCallback(async (num: number) => {
    try {
      await axios.post(`${Config.API_URL}/quest/userquest`, {
        id: userID,
        q_id: num,
      });
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      console.error(errorResponse);
      if (errorResponse) {
        return Alert.alert('알림', errorResponse.data?.message);
      }
    }
  }, []);

  function Quest({Item}) {
    console.log({Item});
    return (
      <View style={styles.Quest}>
        <Text style={styles.QuestName}>{Item.q_name}</Text>
        <Pressable
          style={styles.selectBox}
          onPress={() => {
            saveSelect();
            // 여기서 뭘 어케해야되는지 진짜 모르겠음
            selectQuest(Item.incr);
            navigation.pop();
            navigation.pop();
          }}>
          <Text style={styles.selectTxt}>도전 선택하기</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.CategoryBox}>
        <Text style={styles.Category}>{categoryName}</Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={quest}
          keyExtractor={item => String(item.q_name)}
          renderItem={({item}) => <Quest Item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuestList;

const styles = StyleSheet.create({
  entire: {
    backgroundColor: '#E7EBE4',
    flex: 1,
    paddingTop: 10,
  },
  CategoryBox: {
    backgroundColor: '#CFE0C2',
    marginHorizontal: 20,
    borderRadius: 10,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  Category: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  Quest: {
    backgroundColor: 'white',

    height: 45,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  QuestName: {
    color: '#346627',
    fontWeight: '600',
    fontSize: 15,
    width: 220,
  },
  selectBox: {
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.5,
    height: 25,
    width: 100,
  },
  selectTxt: {
    fontSize: 13,
    color: 'black',
  },
});
