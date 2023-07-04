import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {BoardStackNavigationProp} from '../navigations/BoardNavigation';

type ItemProps = {
  incr: number;
  c_id: number;
  title: string;
  like: number;
  comment: number;
  myrec: number;
};

const PostItem = ({item}: {item: ItemProps}) => {
  const navigation = useNavigation<BoardStackNavigationProp>();

  const category = (c_id: number): string => {
    switch (c_id) {
      case 0:
        return '건강';
      case 1:
        return '여가';
      case 2:
        return '학습';
      case 3:
        return '관계';
      default:
        return '기타';
    }
  };

  return (
    <Pressable
      style={styles.posting}
      onPress={() => navigation.navigate('PostDetail', {postID: item.incr})}>
      <View style={styles.postContent}>
        <Text style={styles.postContentCategory} numberOfLines={1}>
          {category(item.c_id)}
        </Text>
        <Text style={styles.postContentTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <View style={styles.postInfo}>
        <View style={styles.postInfoDetail}>
          <FontAwesomeIcon
            name="thumbs-up"
            size={30}
            color={item.myrec ? '#1F6733' : '#DAE2D8'}
            // 내가 추천했을 경우 색을 다르게
          />
          <Text style={styles.postInfoTxt}>{item.like}</Text>
        </View>
        <View style={styles.postInfoDetail}>
          <FontAwesome5Icon name="comment-dots" size={30} color="#DAE2D8" />
          <Text style={styles.postInfoTxt}>{item.comment}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  posting: {
    borderTopWidth: 1,
    borderTopColor: '#EBEFEA',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postContent: {
    marginLeft: 20,
    justifyContent: 'center',
    width: '65%',
  },
  postContentCategory: {
    fontSize: 14,
    color: '#5F5D5D',
  },
  postContentTitle: {
    fontSize: 18,
    color: '#878787',
  },
  postInfo: {
    flexDirection: 'row',
    marginRight: 20,
  },
  postInfoDetail: {
    marginLeft: 20,
    alignItems: 'center',
  },
  postInfoTxt: {
    fontSize: 11,
    color: '#B7CBB2',
  },
});

export default PostItem;
