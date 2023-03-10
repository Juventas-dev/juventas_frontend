import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { MessageStackNavigationProp } from '../navigations/MessageNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

type ItemProps = {
    incr: number;
    id: string;
    content: string;
    when: string;
  };

const MessageItem = ({item}: {item: ItemProps}) => {
  const navigation = useNavigation<MessageStackNavigationProp>();
  const userID = useSelector((state: RootState) => state.user.id);


  return (
    <Pressable style={styles.eachMessage} onPress={() => navigation.navigate('MessageDetail', {me: userID, you: item.id})}>
			<View style={styles.profile}></View>
			<View style={styles.body}>
				<Text style={styles.id} numberOfLines={1}>{item.id}</Text>
				<Text style={styles.content}  numberOfLines={2}>{item.content}</Text>
			</View>
			<View style={styles.when}>
				<Text style={styles.whenTxt}>{item.when}</Text>
			</View>
    </Pressable>
  );
};

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

export default MessageItem;
