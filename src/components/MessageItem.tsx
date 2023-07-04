import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MessageStackNavigationProp} from '../navigations/MessageNavigation';

type ItemProps = {
  incr: number;
  user_name: string;
  message: string;
  timestamp: string;
  not_read: number;
};

const MessageItem = ({item}: {item: ItemProps}) => {
  const navigation = useNavigation<MessageStackNavigationProp>();

  return (
    <Pressable
      style={styles.eachMessage}
      onPress={() => navigation.navigate('MessageDetail', {incr: item.incr})}>
      <View style={styles.profile} />
      <View style={styles.body}>
        <Text style={styles.id} numberOfLines={1}>
          {item.user_name}
        </Text>
        <Text style={styles.content} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.when}>
          <Text style={styles.whenTxt}>{item.timestamp}</Text>
        </View>
        {item.not_read !== 0 ? (
          <View style={styles.notread}>
            <Text style={styles.notreadTxt}>{item.not_read}</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    </Pressable>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  eachMessage: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 6,
  },
  profile: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  body: {
    width: '65%',
    height: 60,
    paddingLeft: 10,
  },
  id: {
    color: '#3D3C3C',
    fontWeight: '700',
    fontSize: 18,
  },
  content: {
    color: '#878787',
    fontWeight: '500',
    fontSize: 15,
  },
  when: {
    width: 70,
    alignItems: 'flex-end',
  },
  whenTxt: {
    color: '#878787',
    fontWeight: '500',
    fontSize: 12,
  },
  notread: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#346627',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notreadTxt: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
