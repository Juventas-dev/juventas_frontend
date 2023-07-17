import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MessageStackNavigationProp} from '../navigations/MessageNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

type ItemProps = {
  incr: number;
  user_name: string;
  message: string;
  timestamp: string;
  not_read: number;
  profile_img: string;
};

const MessageItem = ({item}: {item: ItemProps}) => {
  const navigation = useNavigation<MessageStackNavigationProp>();

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) {
      return '방금전';
    }
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
    <Pressable
      style={styles.eachMessage}
      onPress={() => navigation.navigate('MessageDetail', {incr: item.incr})}>
      {item.profile_img === undefined || item.profile_img === null ? (
        <Pressable>
          <Icon name="md-person-circle-outline" color="gray" size={60} />
        </Pressable>
      ) : (
        <Pressable>
          <Image
            style={styles.image}
            source={{uri: `${item.profile_img}?time=${new Date()}`}}
          />
        </Pressable>
      )}
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
          <Text style={styles.whenTxt}>{timeForToday(item.timestamp)}</Text>
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
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
