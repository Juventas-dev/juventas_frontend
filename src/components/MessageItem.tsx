import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { MessageStackNavigationProp } from '../navigations/MessageNavigation';

type ItemProps = {
  incr: number;
  user_name: string;
  last_chat: string;
};

const MessageItem = ({item}: {item: ItemProps}) => {
  const navigation = useNavigation<MessageStackNavigationProp>();

  return (
    <Pressable style={styles.eachMessage} onPress={() => (navigation.navigate('MessageDetail', {incr:String(item.incr)}))}>
      <View style={styles.profile}></View>
      <View style={styles.body}>
        <Text style={styles.id} numberOfLines={1}>{item.user_name}</Text>
        <Text style={styles.content}  numberOfLines={2}>{item.incr}</Text>
      </View>
      <View style={styles.when}>
        <Text style={styles.whenTxt}>{item.last_chat.split('.')[0].slice(-8,-3)}</Text>
      </View>
    </Pressable>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  eachMessage:{
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 6
  },
  profile: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 30
  },
  body:{
    width: '65%',
    height: 60,
    paddingLeft: 10,
  },
  id:{
    color: '#3D3C3C',
    fontWeight: '700',
    fontSize: 18
  },
  content:{
    color: '#878787',
    fontWeight: '500',
    fontSize: 15
  },
  when:{
    width: 70,
    alignItems: 'flex-end'
  },
  whenTxt:{
    color: '#878787',
    fontWeight: '500',
    fontSize: 12
  }
});

