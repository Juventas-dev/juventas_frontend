import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuestStackParamList} from '../navigations/AllQuestNavigation';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type QuestScreenProps = NativeStackScreenProps<QuestStackParamList, 'AllQuest'>;

const AllQuest = ({navigation}: QuestScreenProps) => {
  const setCategory = useCallback((text: string) => {
    AsyncStorage.setItem('category', text, () => {
      console.log('저장완료');
    });
  }, []);
  const userID = useSelector((state: RootState) => state.user.id);

  return (
    <SafeAreaView style={styles.entire}>
      <View style={styles.QuestBox}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Pressable
            style={styles.Health}
            onPress={() => {
              setCategory('건강');
              navigation.navigate('QuestList');
            }}>
            <Text style={styles.Txt}>건강</Text>
          </Pressable>
          <Pressable
            style={styles.Leisure}
            onPress={() => {
              setCategory('여가');
              navigation.navigate('QuestList');
            }}>
            <Text style={styles.Txt}>여가</Text>
          </Pressable>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Pressable
            style={styles.Study}
            onPress={() => {
              setCategory('학습');
              navigation.navigate('QuestList');
            }}>
            <Text style={styles.Txt}>학습</Text>
          </Pressable>
          <Pressable
            style={styles.Relation}
            onPress={() => {
              setCategory('관계');
              navigation.navigate('QuestList');
            }}>
            <Text style={styles.Txt}>관계</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={styles.All}
        onPress={() => {
          setCategory('전체');
          navigation.navigate('QuestList');
        }}>
        <Text style={styles.AllTxt}>전체</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AllQuest;

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#E7EBE4',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  QuestBox: {
    backgroundColor: 'yellow',
    borderRadius: 30,
    width: '90%',
    height: '100%',
  },
  Health: {
    flex: 1,
    borderTopLeftRadius: 30,
    backgroundColor: '#CFE0C2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Leisure: {
    flex: 1,
    borderTopRightRadius: 30,
    backgroundColor: '#99B484',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Study: {
    flex: 1,
    borderBottomLeftRadius: 30,
    backgroundColor: '#506D38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Relation: {
    flex: 1,
    borderBottomRightRadius: 30,
    backgroundColor: '#6D8E53',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Txt: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  All: {
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 100,
    width: '33%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AllTxt: {fontSize: 30, fontWeight: '900', color: '#346627'},
});
