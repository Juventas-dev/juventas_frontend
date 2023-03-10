import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, Pressable, StyleSheet, RefreshControl,} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessageStackParamList } from '../navigations/MessageNavigation';
import MessageItem from '../components/MessageItem';

const messageDATA = [
  {
  'incr':1,
  'id': 'abd',
  'content':'어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
  'when':'오전 12:01'
  },
  {
  'incr':2,
  'id': 'abc',
  'content':'샬라샤락',
  'when':'오전 12:01'
  },
  {
  'incr':3,
  'id': '아이디',
  'content':'콘텐츠',
  'when':'오전 12:01'
  },
];

type MessageScreenProps = NativeStackScreenProps<
  MessageStackParamList,
  'Message'
>;

function Message({navigation}: MessageScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.entire}>
      <FlatList
        data={messageDATA}
        renderItem={({item}) => <MessageItem item={item} />}
        keyExtractor={Item => String(Item.incr)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
export default Message;

const styles = StyleSheet.create({
  entire:{
    backgroundColor: 'white',
    flex:1
  },
});